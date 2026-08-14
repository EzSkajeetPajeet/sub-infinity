"""Provider-agnostic LLM client.

Reads OPENAI_API_KEY from the environment (.env file). If the key is present,
uses the real OpenAI client; otherwise falls back to a stub that returns a
timestamped transcript so the pipeline still runs end-to-end without a key.
"""
from __future__ import annotations

import json
import os
from typing import Protocol

from models import Note, TranscriptSegment

# Load variables from .env if python-dotenv is available.
try:
    from dotenv import load_dotenv

    load_dotenv()
except Exception:
    pass  # .env is optional; env vars may already be set.


def _fmt_time(sec: float) -> str:
    h = int(sec // 3600)
    m = int((sec % 3600) // 60)
    s = int(sec % 60)
    return f"{h:02d}:{m:02d}:{s:02d}"


def _format_transcript(segments: list[TranscriptSegment]) -> str:
    return "\n".join(
        f"[{_fmt_time(s.start)}] {s.text.strip()}" for s in segments
    )


def _extract_json(content: str | None) -> dict:
    """Parse JSON from an LLM reply, tolerating surrounding prose/fences."""
    if not content:
        return {}
    text = content.strip()
    if text.startswith("```"):
        text = text.strip("`")
        if text.lower().startswith("json"):
            text = text[4:]
        text = text.strip()
    try:
        return json.loads(text)
    except Exception:
        start, end = text.find("{"), text.rfind("}")
        if start != -1 and end != -1:
            try:
                return json.loads(text[start : end + 1])
            except Exception:
                return {}
        return {}


COMBINE_PROMPT = """You are a careful physics note-taker. Below is a timestamped \
transcript of a video (lecture or conference). Organize it into clear study notes:

- Group content by TOPIC using "## Topic" markdown headers.
- Keep a timestamp like [hh:mm:ss] next to each key point so it can be jumped to.
- Be concise but preserve scientific accuracy and key terms.

Transcript:
{transcript}

Return STRICT JSON only, no prose:
{{"title": "short title", "body": "markdown notes with topic headers and timestamps", "topics": ["topic1", "topic2"]}}
"""


class LLMClient(Protocol):
    """Interface every LLM backend implements."""

    name: str

    def combine_transcript(
        self, segments: list[TranscriptSegment], source: str
    ) -> Note: ...


class StubLLMClient:
    """Mock LLM used when no API key is set.

    Produces a readable timestamped transcript note so the video pipeline is
    useful even before an API key is plugged in.
    """

    name = "stub"

    def combine_transcript(
        self, segments: list[TranscriptSegment], source: str
    ) -> Note:
        lines = [
            f"# Transcript of {os.path.basename(source)}",
            "",
            "_(stub output - set OPENAI_API_KEY in .env for AI-organized notes)_",
            "",
        ]
        for s in segments:
            lines.append(f"**[{_fmt_time(s.start)}]** {s.text.strip()}")
        return Note(
            title=f"Notes from {os.path.basename(source)} (stub)",
            body="\n".join(lines),
            topics=["transcript"],
            source=f"video:{source}",
        )


class OpenAIClient:
    """OpenAI-compatible client.

    Works with OpenAI itself, or any custom model / provider that exposes an
    OpenAI-compatible API (Ollama, LM Studio, OpenRouter, Groq, ...).

    - api_key: the provider's key. Empty string is fine for local servers.
    - base_url: endpoint base. Empty -> OpenAI's default.
    - model: the model name the endpoint serves.
    """

    name = "openai"

    def __init__(
        self, api_key: str, base_url: str = "", model: str = "gpt-4o-mini"
    ) -> None:
        from openai import OpenAI

        kwargs = {"api_key": api_key}
        if base_url:
            kwargs["base_url"] = base_url
        self.client = OpenAI(**kwargs)
        self.model = model

    def combine_transcript(
        self, segments: list[TranscriptSegment], source: str
    ) -> Note:
        prompt = COMBINE_PROMPT.format(transcript=_format_transcript(segments))
        content = None
        # Some endpoints don't support response_format=json_object; try it,
        # then retry without it and extract JSON from plain text.
        try:
            resp = self.client.chat.completions.create(
                model=self.model,
                messages=[{"role": "user", "content": prompt}],
                response_format={"type": "json_object"},
                temperature=0.3,
            )
            content = resp.choices[0].message.content
        except Exception:
            resp = self.client.chat.completions.create(
                model=self.model,
                messages=[{"role": "user", "content": prompt}],
                temperature=0.3,
            )
            content = resp.choices[0].message.content
        data = _extract_json(content)
        return Note(
            title=data.get("title", f"Notes from {os.path.basename(source)}"),
            body=data.get("body", ""),
            topics=data.get("topics", []),
            source=f"video:{source}",
        )


def get_llm_client() -> LLMClient:
    """Pick the LLM backend from the environment; fall back to stub.

    The OpenAI-compatible client is used when:
      - LLM_PROVIDER is anything except "stub" (default "openai"), AND
      - either an API key OR a base_url is configured.
    Otherwise -> StubLLMClient (so the app always runs).

    Works with OpenAI, Volcengine, Ollama, LM Studio, OpenRouter, Groq, etc. -
    any endpoint that speaks the OpenAI-compatible chat/completions API.
    """
    provider = os.getenv("LLM_PROVIDER", "openai").lower().strip()
    key = os.getenv("OPENAI_API_KEY", "").strip()
    base_url = os.getenv("LLM_BASE_URL", "").strip()
    model = os.getenv("LLM_MODEL", "").strip() or "gpt-4o-mini"

    use_real = provider != "stub" and (key or base_url)
    if use_real:
        try:
            client = OpenAIClient(api_key=key or "none", base_url=base_url, model=model)
            print(f"[llm] using provider='{provider}' model='{model}' base_url='{base_url or '(default)'}'")
            return client
        except Exception as e:  # missing SDK, bad key, etc.
            print(f"[llm] could not init LLM client ({e}); using stub.")
    print(f"[llm] no API key/base_url for provider='{provider}'; using stub.")
    return StubLLMClient()

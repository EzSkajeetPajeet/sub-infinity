"""Audio/video transcription using local faster-whisper (no API key needed)."""
from __future__ import annotations

import os
from dataclasses import dataclass

from models import TranscriptSegment


@dataclass
class WhisperConfig:
    model_size: str = "base"  # tiny | base | small | medium | large-v3
    device: str = "cpu"  # cpu | cuda
    compute_type: str = "int8"  # int8 (cpu) | float16 (gpu)


class WhisperTranscriber:
    """Wraps faster-whisper. The model downloads on first use, then is cached."""

    def __init__(self, config: WhisperConfig | None = None) -> None:
        if config is None:
            config = WhisperConfig(
                model_size=os.getenv("WHISPER_MODEL", "base"),
                device=os.getenv("WHISPER_DEVICE", "cpu"),
                compute_type=os.getenv("WHISPER_COMPUTE", "int8"),
            )
        self.config = config
        self._model = None

    def _get_model(self):
        if self._model is None:
            from faster_whisper import WhisperModel

            print(
                f"[transcriber] loading Whisper model '{self.config.model_size}' "
                f"(first run downloads it; cached afterwards)..."
            )
            self._model = WhisperModel(
                self.config.model_size,
                device=self.config.device,
                compute_type=self.config.compute_type,
            )
        return self._model

    def transcribe(self, path: str) -> list[TranscriptSegment]:
        model = self._get_model()
        print(f"[transcriber] transcribing: {path}")
        segments_gen, info = model.transcribe(path, vad_filter=True)
        segments = [
            TranscriptSegment(start=s.start, end=s.end, text=s.text)
            for s in segments_gen
        ]
        print(
            f"[transcriber] done: {len(segments)} segment(s), "
            f"language={info.language}"
        )
        return segments

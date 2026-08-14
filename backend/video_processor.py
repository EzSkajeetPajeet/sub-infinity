"""Video pipeline: transcribe (Whisper) -> LLM combine -> Note."""
from __future__ import annotations

from models import Note
from transcriber import WhisperTranscriber
from llm_client import get_llm_client


class VideoProcessor:
    """Turns a video file into an organized Note.

    Steps:
      1. transcribe the audio track with local Whisper (timestamped segments)
      2. ask the LLM to organize the transcript into a topic-tagged Note
    """

    def __init__(self) -> None:
        self.transcriber = WhisperTranscriber()
        self.llm = get_llm_client()

    def process(self, video_path: str) -> Note:
        print(f"[video] processing: {video_path}")
        print(f"[video] LLM backend: {self.llm.name}")
        segments = self.transcriber.transcribe(video_path)
        if not segments:
            print("[video] no speech detected.")
        print("[video] organizing transcript into a note...")
        note = self.llm.combine_transcript(segments, source=video_path)
        print(f"[video] done -> '{note.title}'")
        return note

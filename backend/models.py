"""Data classes shared across sub-infinity."""
from __future__ import annotations

from dataclasses import dataclass, field
from datetime import datetime, timezone
from uuid import uuid4


@dataclass
class TranscriptSegment:
    """One chunk of transcribed speech, with timestamps in seconds."""

    start: float
    end: float
    text: str

    def to_dict(self) -> dict:
        return {"start": self.start, "end": self.end, "text": self.text}


@dataclass
class Note:
    """A knowledge card produced from a video or entered manually.

    - `body` holds the note content (markdown). For video notes this is
      organized into topic sections with timestamp markers like [hh:mm:ss].
    - `topics` is the flat list of topic tags extracted from the content.
    - `timestamp` is a single ISO time used for time-based sorting.
    """

    id: str = field(default_factory=lambda: uuid4().hex)
    title: str = ""
    body: str = ""
    topics: list[str] = field(default_factory=list)
    timestamp: str = ""
    source: str = ""  # e.g. "video:lecture1.mp4" or "manual"
    created_at: str = field(
        default_factory=lambda: datetime.now(timezone.utc).isoformat()
    )

    def to_dict(self) -> dict:
        return {
            "id": self.id,
            "title": self.title,
            "body": self.body,
            "topics": self.topics,
            "timestamp": self.timestamp,
            "source": self.source,
            "created_at": self.created_at,
        }

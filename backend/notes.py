"""In-memory note library with sort by topic and time."""
from __future__ import annotations

from models import Note


class NoteLibrary:
    def __init__(self) -> None:
        self._notes: list[Note] = []

    def add(self, note: Note) -> None:
        self._notes.append(note)

    def list_all(self) -> list[Note]:
        return list(self._notes)

    def _time_key(self, n: Note) -> str:
        return n.timestamp or n.created_at

    def sort_by_time(self, ascending: bool = True) -> list[Note]:
        return sorted(self._notes, key=self._time_key, reverse=not ascending)

    def sort_by_topic(self) -> dict[str, list[Note]]:
        """Group notes by topic tag; within each topic, sort by time."""
        groups: dict[str, list[Note]] = {}
        for n in self._notes:
            tags = n.topics or ["untagged"]
            for tag in tags:
                groups.setdefault(tag, []).append(n)
        for tag in groups:
            groups[tag] = sorted(groups[tag], key=self._time_key)
        return groups

    def search(self, query: str) -> list[Note]:
        q = query.lower()
        return [
            n for n in self._notes if q in n.title.lower() or q in n.body.lower()
        ]

    def print_summary(self) -> None:
        print(f"\n=== Note Library: {len(self._notes)} note(s) ===")
        for n in self.sort_by_time():
            print(
                f"- [{n.timestamp or n.created_at}] {n.title}  "
                f"topics={n.topics}  source={n.source}"
            )

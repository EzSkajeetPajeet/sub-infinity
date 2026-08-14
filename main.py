"""Sub-Infinity - FastAPI backend.

Endpoints:
  POST /api/upload   - upload a video/audio file, run the pipeline, return a Note
  GET  /api/notes     - list all notes (optional ?sort=time|topic)
  POST /api/notes     - add a manual note
  GET  /api/health    - health check
"""
from __future__ import annotations

import os
import tempfile

from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from models import Note
from notes import NoteLibrary
from video_processor import VideoProcessor

app = FastAPI(title="Sub-Infinity", version="0.2.0")

# Allow the Vite dev server (port 5173) to call this API.
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Shared in-memory note library (persists across requests within a session).
library = NoteLibrary()


class NoteCreate(BaseModel):
    title: str
    body: str = ""
    topics: list[str] = []
    timestamp: str = ""


@app.get("/api/health")
def health() -> dict:
    return {"status": "ok"}


@app.post("/api/upload")
async def upload_file(file: UploadFile = File(...)) -> dict:
    """Upload a video/audio file -> transcribe -> LLM organize -> return Note."""
    suffix = os.path.splitext(file.filename or "upload")[1] or ".bin"
    with tempfile.NamedTemporaryFile(delete=False, suffix=suffix) as tmp:
        content = await file.read()
        tmp.write(content)
        tmp_path = tmp.name

    try:
        processor = VideoProcessor()
        note = processor.process(tmp_path)
        note.source = f"video:{file.filename}"
        library.add(note)
        return note.to_dict()
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        if os.path.exists(tmp_path):
            os.unlink(tmp_path)


@app.get("/api/notes")
def list_notes(sort: str = "time") -> dict:
    """List all notes. sort=time (default) or sort=topic."""
    if sort == "topic":
        groups = library.sort_by_topic()
        return {
            "sort": "topic",
            "groups": {
                tag: [n.to_dict() for n in notes]
                for tag, notes in groups.items()
            },
        }
    else:
        notes = library.sort_by_time()
        return {"sort": "time", "notes": [n.to_dict() for n in notes]}


@app.post("/api/notes")
def add_note(payload: NoteCreate) -> dict:
    note = Note(
        title=payload.title,
        body=payload.body,
        topics=payload.topics,
        timestamp=payload.timestamp,
        source="manual",
    )
    library.add(note)
    return note.to_dict()


if __name__ == "__main__":
    import uvicorn

    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)

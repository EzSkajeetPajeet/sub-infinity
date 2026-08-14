import { create } from "zustand";
import type { Note } from "@/types";
import { fetchNotes, uploadFile, addNote } from "@/api";

type SortMode = "time" | "topic";

interface Store {
  notes: Note[];
  topicGroups: Record<string, Note[]> | null;
  sortMode: SortMode;
  loading: boolean;
  processing: boolean;
  processingName: string | null;
  error: string | null;
  selectedNote: Note | null;
  backendOnline: boolean;

  setSortMode: (mode: SortMode) => void;
  refresh: () => Promise<void>;
  processFile: (file: File) => Promise<void>;
  createNote: (data: { title: string; body: string; topics: string[]; timestamp: string }) => Promise<void>;
  selectNote: (note: Note | null) => void;
  checkBackend: () => Promise<void>;
}

export const useStore = create<Store>((set, get) => ({
  notes: [],
  topicGroups: null,
  sortMode: "time",
  loading: false,
  processing: false,
  processingName: null,
  error: null,
  selectedNote: null,
  backendOnline: false,

  setSortMode: (mode) => {
    set({ sortMode: mode });
    get().refresh();
  },

  refresh: async () => {
    const mode = get().sortMode;
    set({ loading: true, error: null });
    try {
      const data = await fetchNotes(mode);
      if (data.sort === "time") {
        set({ notes: data.notes, topicGroups: null, loading: false });
      } else {
        set({ topicGroups: data.groups, notes: [], loading: false });
      }
    } catch (e) {
      set({ loading: false, error: String(e) });
    }
  },

  processFile: async (file) => {
    set({ processing: true, processingName: file.name, error: null, selectedNote: null });
    try {
      const note = await uploadFile(file);
      await get().refresh();
      set({ processing: false, processingName: null, selectedNote: note });
    } catch (e) {
      set({ processing: false, processingName: null, error: String(e) });
    }
  },

  createNote: async (data) => {
    set({ error: null });
    try {
      await addNote(data);
      await get().refresh();
    } catch (e) {
      set({ error: String(e) });
    }
  },

  selectNote: (note) => set({ selectedNote: note }),

  checkBackend: async () => {
    try {
      const res = await fetch("/api/health");
      set({ backendOnline: res.ok });
    } catch {
      set({ backendOnline: false });
    }
  },
}));

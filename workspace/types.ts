export interface Note {
  id: string;
  title: string;
  body: string;
  topics: string[];
  timestamp: string;
  source: string;
  created_at: string;
}

export interface NotesTimeResponse {
  sort: "time";
  notes: Note[];
}

export interface NotesTopicResponse {
  sort: "topic";
  groups: Record<string, Note[]>;
}

export type NotesResponse = NotesTimeResponse | NotesTopicResponse;

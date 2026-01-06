// Shared / API-safe (used by API routes, RTK Query, UI components)

import type { JSONContent } from "@tiptap/core";

export interface Note {
  _id: string;
  userId: string;
  title: string;
  content: JSONContent;
  isFavorite: boolean;
  isPinned: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface NotesResponse {
  data: Note[];
  meta: {
    page: number;
    limit: number;
    total: number;
    hasMore: boolean;
  };
}

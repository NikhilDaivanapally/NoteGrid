import type { JSONContent } from "@tiptap/core";
import { Types } from "mongoose";

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

export interface NoteDocument {
  _id: Types.ObjectId;
  userId: Types.ObjectId;
  title: string;
  content: JSON;
  isFavorite: boolean;
  isPinned: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export type NoteStatus = "all" | "favorite" | "pinned";
export type NotesSortBy = "updatedAt" | "createdAt" | "title";
export type DateRange = "all" | "today" | "last7" | "last30";
export type SortOrder = "asc" | "desc";

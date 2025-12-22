import { Types } from "mongoose";

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

export interface Note {
  _id: string;
  userId: string;
  title: string;
  content: string;
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

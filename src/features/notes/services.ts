import "server-only";

import connectToDatabase from "@/db/mongoose";
import Note from "@/db/models/note.model";
import { Types } from "mongoose";
import { AppError } from "@/lib/errors";
import { buildMongoQuery } from "../shared/lib/db/build-query";
import { notesFilterConfig, NotesFilters } from "./filters.config";
import { NotesSortBy, SortOrder } from "./types";

export interface GetNotesParams extends NotesFilters {
  userId: string;
  page: number;
  limit: number;
  sortBy: NotesSortBy;
  sortOrder: SortOrder | 1 | -1;
}

export interface CreateNoteInput {
  userId: string;

  title: string;
  content: object;
}
export interface UpdateNoteInput {
  noteId: string;
  userId: string;
  data: Record<string, any>;
}

export interface DeleteNoteInput {
  noteId: string;
  userId: string;
}

export interface GetNotesByIdParams {
  noteId: string;
  userId: string;
}
export interface GetRecentNotesParams {
  userId: string;

  limit: number;
  sortBy: NotesSortBy;
  sortOrder: SortOrder | 1 | -1;
}

function toObjectId(id: string) {
  if (!Types.ObjectId.isValid(id)) {
    throw new Error("Invalid note Id");
  }
  return new Types.ObjectId(id);
}

// GET ALL NOTES
export async function getNotes(params: GetNotesParams) {
  await connectToDatabase();

  const { userId, page, limit, search, status, dateRange, sortBy, sortOrder } =
    params;

  const baseQuery = { userId };

  const filterQuery = buildMongoQuery(
    { search, status, dateRange },
    notesFilterConfig,
  );

  const query = {
    ...baseQuery,
    ...filterQuery,
  };

  const [notes, total] = await Promise.all([
    Note.find(query)
      .sort({ [sortBy]: sortOrder })
      .skip((page - 1) * limit)
      .limit(limit)
      .lean(),
    Note.countDocuments(query),
  ]);

  return {
    data: notes,
    meta: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
      hasMore: Math.ceil(total / limit) - page > 0 ? true : false,
    },
  };
}

// GET NOTE BY ID
export async function getNoteById(params: GetNotesByIdParams) {
  await connectToDatabase();

  const { noteId, userId } = params;

  // Early validation
  if (!noteId) {
    throw new AppError("Missing Note Id", 400);
  }

  const note = await Note.findOne({
    _id: noteId,
    userId,
  }).lean();

  if (!note) {
    throw new AppError("Note not found", 404);
  }

  return note;
}

// RECENT NOTES
export async function getRecentNotes(params: GetRecentNotesParams) {
  await connectToDatabase();

  const { userId, limit, sortBy, sortOrder } = params;

  // Fetch data
  const notes = await Note.find({ userId })
    .sort({ [sortBy]: sortOrder })
    .limit(limit)
    .lean();

  if (!notes) {
    throw new AppError("Invalid user Id", 404);
  }

  return notes;
}

// CREATE NOTE
export async function createNote(params: CreateNoteInput) {
  await connectToDatabase();

  const { title, content, userId } = params;

  if (!title || !content) {
    throw new AppError("Title and Content are required", 400);
  }

  const note = await Note.create({
    title,
    content,
    userId,
  });

  return note;
}

// UPDATE NOTE
export async function updateNote(params: UpdateNoteInput) {
  await connectToDatabase();

  const { noteId, userId, data } = params;

  // Early validation
  if (!noteId) {
    throw new AppError("Missing Note Id", 400);
  }

  // data structure validate
  if (!data || typeof data !== "object" || Array.isArray(data)) {
    throw new AppError("Invalid request body: expected a JSON object", 400);
  }

  const note = await Note.findOneAndUpdate({ _id: noteId, userId }, data, {
    new: true,
    runValidators: true,
  }).lean();

  if (!note) {
    throw new AppError("Note Not Found", 404);
  }

  return note;
}

// DELETE NOTE
export async function deleteNote(params: DeleteNoteInput) {
  await connectToDatabase();

  const { userId, noteId } = params;

  // Early validation
  if (!noteId) {
    throw new AppError("Missing Note Id", 400);
  }

  const note = await Note.findOneAndDelete({
    _id: noteId,
    userId: userId,
  }).lean();

  if (!note) {
    throw new AppError("Note not found", 404);
  }

  return note;
}

import { NoteDocument } from "@/types/notes/note-db";
import { model, models, Schema, Types } from "mongoose";

const NoteSchema = new Schema<NoteDocument>(
  {
    userId: { type: Types.ObjectId, required: true },

    title: {
      type: String,
      required: true,
      trim: true,
    },

    content: {
      type: String,
      required: true,
    },

    isFavorite: {
      type: Boolean,
      default: false,
      index: true,
    },

    isPinned: {
      type: Boolean,
      default: false,
      index: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

// User notes sorted by last update
NoteSchema.index({ userId: 1, updatedAt: -1 });

// Favorites per user
NoteSchema.index({ userId: 1, isFavorite: 1, updatedAt: -1 });

// Pinned per user
NoteSchema.index({ userId: 1, isPinned: 1, updatedAt: -1 });

// Search by title/content
NoteSchema.index({ title: 1, content: 1 });

const Note = models.Note || model("Note", NoteSchema);

export default Note;

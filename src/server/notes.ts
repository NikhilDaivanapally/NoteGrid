"use server";

import Note from "@/db/models/note.model";
import { isValidObjectId } from "mongoose";

type CleanupResult = {
  deletedCount: number;
};

export async function cleanupUserNotes(
  userId: string
): Promise<CleanupResult> {
  if (!userId || !isValidObjectId(userId)) {
    throw new Error("Invalid userId");
  }

  try {
    const result = await Note.deleteMany({ userId });

    return {
      deletedCount: result.deletedCount ?? 0,
    };
  } catch (error) {
    console.error("Failed to cleanup user notes:", {
      userId,
      error,
    });

    throw new Error("Failed to cleanup user notes");
  }
}

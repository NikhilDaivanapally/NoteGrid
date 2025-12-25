"use client";

import { memo } from "react";
import { Note } from "@/types/notes/note";
import { cn } from "@/lib/utils";

type Props = {
  note: Note;
  view: "grid" | "list";
};

function NoteItemComponent({ note, view }: Props) {
  return (
    <article
      className={cn(
        "group bg-secondary flex flex-col gap-1 dark:bg-surface-dark rounded-3xl border border-transparent hover:border-primary/40 transition-all cursor-pointer",
        view === "grid"
          ? "p-6 h-56 hover:shadow-lg"
          : "p-4 mb-3 hover:shadow-md"
      )}
    >
      {/* Header */}
      <h3 className="text-lg font-bold truncate">{note.title}</h3>

      {/* Content */}
      <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-3 flex-1">
        {typeof note.content === "string"
          ? note.content
          : JSON.stringify(note.content)}
      </p>

      {/* Footer */}
      <div className="text-xs font-semibold text-gray-400 ">
        Updated {new Date(note.updatedAt).toLocaleDateString()}
      </div>
    </article>
  );
}

export const NoteItem = memo(NoteItemComponent);

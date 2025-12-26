"use client";

import { memo, useState } from "react";
import { Note } from "@/types/notes/note";
import { cn } from "@/lib/utils";
import { Pin, Star } from "lucide-react";
import { Button } from "../ui/button";

type Props = {
  note: Note;
};

function NoteItemComponent({ note }: Props) {
  const [isFavorite, setIsFavorite] = useState(note.isFavorite);
  const [isPinned, setIsPinned] = useState(note.isPinned);

  const onFavorite = async () => {};

  const onPin = async () => {};

  return (
    <article
      className={cn(
        "group relative flex flex-col gap-3",
        "h-56 rounded-3xl p-4",
        "bg-secondary dark:bg-surface-dark",
        "border border-transparent",
        "hover:border-primary/40 hover:shadow-lg",
        "transition-all"
      )}
    >
      {/* Header */}
      <div className="flex items-start gap-2">
        <h3 className="flex-1 text-base font-semibold truncate">
          {note.title || "Untitled"}
        </h3>

        <div className="flex gap-1">
          <button
            onClick={onFavorite}
            className="text-muted-foreground hover:text-yellow-500"
          >
            <Star
              className={cn(
                "size-4",
                isFavorite && "fill-yellow-400 text-yellow-400"
              )}
            />
          </button>

          <button
            onClick={onPin}
            className="text-muted-foreground hover:text-primary"
          >
            <Pin
              className={cn("size-4", isPinned && "fill-primary text-primary")}
            />
          </button>
        </div>
      </div>

      {/* Content */}
      <p className="flex-1 text-sm text-muted-foreground line-clamp-4">
        {typeof note.content === "string"
          ? note.content
          : JSON.stringify(note.content)}
      </p>

      {/* Footer */}
      <div className="flex items-center justify-between text-xs text-muted-foreground">
        <span>
          Updated{" "}
          {new Date(note.updatedAt).toLocaleDateString(undefined, {
            month: "short",
            day: "numeric",
            year: "numeric",
          })}
        </span>

        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button size="sm" variant="ghost">
            View
          </Button>
          <Button size="sm" variant="ghost" className="text-destructive">
            Delete
          </Button>
        </div>
      </div>
    </article>
  );
}

export const NoteItem = memo(NoteItemComponent);

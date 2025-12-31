"use client";

import { memo, useCallback } from "react";
import Link from "next/link";
import { Pin, Star } from "lucide-react";
import { Note } from "@/types/notes/note";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import EditorContentRenderer from "../editor/editor-content-renderer/editor-content-renderer";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "../editor/editor-ui-primitives/tooltip";

type NoteItemProps = {
  note: Note;
  onDelete: (noteId: string) => void;
  onToggleFavorite: (params: { id: string; isFavorite: boolean }) => void;
  onTogglePin: (params: { id: string; isPinned: boolean }) => void;
};

function NoteItemComponent({
  note,
  onDelete,
  onToggleFavorite,
  onTogglePin,
}: NoteItemProps) {
  // Memoize callbacks to prevent unnecessary re-renders
  const handleFavorite = useCallback(() => {
    onToggleFavorite({ id: note._id, isFavorite: !note.isFavorite });
  }, [note._id, note.isFavorite, onToggleFavorite]);

  const handlePin = useCallback(() => {
    onTogglePin({ id: note._id, isPinned: !note.isPinned });
  }, [note._id, note.isPinned, onTogglePin]);

  const handleDelete = useCallback(() => {
    onDelete(note._id);
  }, [note._id, onDelete]);

  // Format date once
  const formattedDate = new Date(note.updatedAt).toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  const noteTitle = note.title?.trim() || "Untitled";
  const hasObjectContent =
    typeof note.content === "object" && note.content !== null;

  return (
    <article
      className={cn(
        "group relative flex flex-col gap-3",
        "h-56 rounded-3xl p-4",
        "bg-secondary dark:bg-surface-dark",
        "border border-transparent",
        "hover:border-primary/40 hover:shadow-lg",
        "transition-all duration-200"
      )}
      aria-label={`Note: ${noteTitle}`}
    >
      {/* Header */}
      <header className="flex items-start gap-2">
        <h3
          className="flex-1 text-base font-semibold truncate"
          title={noteTitle}
        >
          {noteTitle}
        </h3>

        <div className="flex gap-0.5" role="toolbar" aria-label="Note actions">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                onClick={handleFavorite}
                variant="ghost"
                size="icon"
                className="text-muted-foreground hover:text-yellow-500 cursor-pointer"
                aria-label={
                  note.isFavorite ? "Remove from favorites" : "Add to favorites"
                }
              >
                <Star
                  className={cn(
                    "size-5 transition-colors",
                    note.isFavorite && "fill-yellow-400 text-yellow-400"
                  )}
                  aria-hidden="true"
                />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              {note.isFavorite ? "Remove from favorites" : "Add to favorites"}
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                onClick={handlePin}
                variant="ghost"
                size="icon"
                className="text-muted-foreground hover:text-primary cursor-pointer"
                aria-label={note.isPinned ? "Unpin note" : "Pin note"}
              >
                <Pin
                  className={cn(
                    "size-5 transition-colors",
                    note.isPinned && "fill-primary text-primary"
                  )}
                  aria-hidden="true"
                />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              {note.isPinned ? "Unpin note" : "Pin note"}
            </TooltipContent>
          </Tooltip>
        </div>
      </header>

      {/* Content */}
      <div className="flex-1 overflow-hidden text-sm text-muted-foreground line-clamp-4">
        {hasObjectContent ? (
          <EditorContentRenderer content={note.content} />
        ) : (
          <p className="whitespace-pre-wrap">
            {typeof note.content !== "object" && note?.content}
          </p>
        )}
      </div>

      {/* Footer */}
      <footer className="flex items-center justify-between text-xs text-muted-foreground">
        <time
          dateTime={note.updatedAt}
          title={`Last updated: ${formattedDate}`}
        >
          Updated {formattedDate}
        </time>

        <div className="flex gap-1 sm:opacity-0 sm:group-hover:opacity-100 sm:transition-opacity">
          <Button size="sm" variant="ghost" asChild>
            <Link href={`/dashboard/notes/${note._id}`} prefetch={false}>
              View
            </Link>
          </Button>
          <Button
            onClick={handleDelete}
            size="sm"
            variant="ghost"
            className="text-destructive hover:text-destructive/90 cursor-pointer"
          >
            Delete
          </Button>
        </div>
      </footer>
    </article>
  );
}

export const NoteItem = memo(NoteItemComponent);

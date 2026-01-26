"use client";

import { Note } from "@/types/notes/note";
import { NoteItem } from "../note-item/note-item";
import { useState } from "react";
import {
  useDeleteNoteMutation,
  useToggleFavoriteMutation,
  useTogglePinnedMutation,
} from "@/features/notes/api";
import { ConfirmDialog } from "@/components/dialog/confirm-dialog";
import { DEFAULT_NOTE_QUERY } from "../../constants";

type Props = {
  notes: Note[];
  filters: typeof DEFAULT_NOTE_QUERY;
};

export function NoteList({ filters, notes }: Props) {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [open, setOpen] = useState(false);

  const [deleteNote, { isLoading: isDeleting }] = useDeleteNoteMutation();
  const [toggleFavorite] = useToggleFavoriteMutation();
  const [togglePin] = useTogglePinnedMutation();

  const handleToggleFavorite = ({
    id,
    isFavorite,
  }: {
    id: string;
    isFavorite: boolean;
  }) => {
    toggleFavorite({ id, isFavorite, filters });
  };
  const handleTogglePin = ({
    id,
    isPinned,
  }: {
    id: string;
    isPinned: boolean;
  }) => {
    togglePin({ id, isPinned, filters });
  };

  const handleDeleteClick = (id: string) => {
    setSelectedId(id);
    setOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!selectedId) return;

    try {
      await deleteNote({ id: selectedId, filters }).unwrap();
      setOpen(false); // close ONLY on success
      setSelectedId(null);
    } catch (err) {
      // keep dialog open on failure
      console.error("Delete failed", err);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
      {notes.map((note) => (
        <NoteItem
          key={note._id.toString()}
          note={note}
          onDelete={() => handleDeleteClick(note._id)}
          onToggleFavorite={handleToggleFavorite}
          onTogglePin={handleTogglePin}
        />
      ))}
      <ConfirmDialog
        open={open}
        onOpenChange={isDeleting ? () => {} : setOpen} // prevent close while loading
        title="Delete note?"
        description="This action cannot be undone."
        confirmText={isDeleting ? "Deleting..." : "Delete"}
        destructive
        loading={isDeleting}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
}

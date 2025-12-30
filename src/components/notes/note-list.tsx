"use client";

import { Note } from "@/types/notes/note";
import { NoteItem } from "./note-item";
import { useState } from "react";
import { useDeleteNoteMutation } from "@/store/api/noteApi";
import { ConfirmDialog } from "../dialog/confirm-dialog";

type Props = {
  notes: Note[];
};

export function NoteList({ notes }: Props) {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [open, setOpen] = useState(false);

  const [deleteNote, { isLoading, data }] = useDeleteNoteMutation();

  const handleDeleteClick = (id: string) => {
    setSelectedId(id);
    setOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!selectedId) return;

    try {
      await deleteNote(selectedId).unwrap();
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
        />
      ))}
      <ConfirmDialog
        open={open}
        onOpenChange={isLoading ? () => {} : setOpen} // prevent close while loading
        title="Delete note?"
        description="This action cannot be undone."
        confirmText={isLoading ? "Deleting..." : "Delete"}
        destructive
        loading={isLoading}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
}

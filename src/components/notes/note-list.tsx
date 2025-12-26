"use client";

import { Note } from "@/types/notes/note";
import { NoteItem } from "./note-item";

type Props = {
  notes: Note[];
};

export function NoteList({ notes }: Props) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
      {notes.map((note) => (
        <NoteItem key={note._id.toString()} note={note} />
      ))}
    </div>
  );
}

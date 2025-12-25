"use client";

import { Note } from "@/types/notes/note";
import { NoteItem } from "./note-item";

type Props = {
  notes: Note[];
  view: "grid" | "list";
};

export function NoteList({ notes, view }: Props) {
  /* LIST VIEW */
  if (view === "list") {
    return (
      <div className="flex flex-col gap-3">
        {notes.map((note) => (
          <NoteItem
            key={note._id.toString()}
            note={note}
            view="list"
          />
        ))}
      </div>
    );
  }

  /* GRID VIEW */
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
      {notes.map((note) => (
        <NoteItem
          key={note._id.toString()}
          note={note}
          view="grid"
        />
      ))}
    </div>
  );
}

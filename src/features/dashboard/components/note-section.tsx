"use client";

import { NoteItem } from "@/features/notes/components/note-item/note-item";

function NotesSection({ title, notes }: { title: string; notes?: any[] }) {
  if (!notes?.length) return null;

  return (
    <section className="space-y-3">
      <h2 className="text-lg font-semibold text-muted-foreground">{title}</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
        {notes.map((note) => (
          <NoteItem
            showActions={false}
            key={note._id}
            note={note}
            onDelete={() => {}}
            onToggleFavorite={() => {}}
            onTogglePin={() => {}}
          />
        ))}
      </div>
    </section>
  );
}

export default NotesSection;

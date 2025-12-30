"use client";

import { useGetNoteByIdQuery } from "@/store/api/noteApi";
import NoteForm from "@/components/forms/note-form";

export const ViewNote = ({ id }: { id: string }) => {
  const { data, isLoading } = useGetNoteByIdQuery(id);

  if (isLoading && !data) {
    return <div>Loading...</div>;
  }

  return (
    <div className="px-4 h-full overflow-y-auto">
      <NoteForm
        mode="edit"
        noteId={data?._id}
        initialTitle={data?.title}
        initialContent={data?.content}
      />
    </div>
  );
};

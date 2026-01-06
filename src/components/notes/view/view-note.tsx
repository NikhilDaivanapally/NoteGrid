"use client";

import { useGetNoteByIdQuery } from "@/store/api/noteApi";
import NoteForm from "@/components/forms/note-form";
import { TextShimmer } from "@/components/ui/text-shimmer";

export const ViewNote = ({ id }: { id: string }) => {
  const { data, isLoading } = useGetNoteByIdQuery(id);

  if (isLoading && !data) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <TextShimmer>Fetching Note</TextShimmer>
      </div>
    );
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

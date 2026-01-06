"use client";
import content from "@/components/editor/data/content.json";
import {
  useCreateNoteMutation,
  useUpdateNoteMutation,
} from "@/store/api/noteApi";
import type { JSONContent } from "@tiptap/core";
import { useRef, useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { NoteEditor } from "../editor/note-editor";
import { Note } from "@/types/notes/note";
import { useRouter } from "next/navigation";

type NoteFormProps = {
  mode: "create" | "edit";
  noteId?: string;
  initialTitle?: string;
  initialContent?: JSONContent | null;
};

const NoteForm = ({
  mode,
  noteId,
  initialTitle = "",
  initialContent = content,
}: NoteFormProps) => {
  const router = useRouter();

  const contentRef = useRef<JSONContent | null>(initialContent);
  const [title, setTitle] = useState(initialTitle);

  const [createNote, { isLoading: isCreating }] = useCreateNoteMutation();
  const [updateNote, { isLoading: isUpdating }] = useUpdateNoteMutation();

  const isLoading = isCreating || isUpdating;

  const isEqualJSON = (a: JSONContent | null, b: JSONContent | null) => {
    return JSON.stringify(a) === JSON.stringify(b);
  };

  const handleSubmit = async () => {
    if (mode === "create") {
      await createNote({
        title,
        content: contentRef.current!,
      });
      router.back();
    } else {
      if (!noteId) return;

      const updatePayload: Partial<Note> = {};

      // note id
      updatePayload._id = noteId;

      // compare title
      if (title.trim() !== initialTitle.trim()) {
        updatePayload.title = title;
      }

      // compare content
      if (!isEqualJSON(contentRef.current, initialContent)) {
        updatePayload.content = contentRef.current!;
      }

      await updateNote(updatePayload);
    }
  };

  return (
    <div className="max-w-5xl mx-auto relative">
      <div>
        {/* Header */}
        <div className="flex items-end gap-2 bg-background sticky top-0 h-8 z-10">
          <Input
            placeholder="Enter note title"
            autoFocus={mode === "create"}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border-0 border-b shadow-none focus-visible:ring-0 rounded-none text-lg bg-background"
          />

          <Button onClick={handleSubmit} size="sm" disabled={isLoading}>
            {isLoading
              ? "Saving..."
              : mode === "create"
                ? "Create Note"
                : "Update Note"}
          </Button>
        </div>

        {/* Editor */}
        <NoteEditor
          initialContent={initialContent}
          onContentUpdate={(json: JSONContent) => {
            contentRef.current = json;
          }}
        />
      </div>
    </div>
  );
};

export default NoteForm;

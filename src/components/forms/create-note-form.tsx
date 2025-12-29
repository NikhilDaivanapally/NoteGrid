"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCreateNoteMutation } from "@/store/api/noteApi";
import { NoteEditor } from "../editor/note-editor";
import content from "@/components/editor/data/content.json";

export function CreateNoteForm() {
  const contentRef = useRef<Object>(content);

  const [title, setTitle] = useState("");

  const [createNote, { isLoading }] = useCreateNoteMutation();

  useEffect(() => {
    console.log(contentRef.current);
  }, [contentRef.current]);

  const handleSave = useCallback(() => {
    if (!title && !contentRef.current) return;

    console.log("Saving on unmount:", {
      title,
      content: contentRef.current,
    });
  }, [title, createNote]);

  useEffect(() => {
    return () => {
      handleSave();
    };
  }, [handleSave]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    createNote({
      title,
      content: contentRef.current,
    });
  };

  return (
    <div className="max-w-5xl mx-auto relative">
      <div className="">
        {/* Header row */}
        <div className="flex items-end gap-2 bg-background sticky top-0 h-8 z-10">
          <div className="space-y-2 flex-1 max-w-3xl">
            {/* <Label htmlFor="title">Title</Label> */}
            <Input
              id="title"
              placeholder="Enter note title"
              autoFocus
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="border-0 border-b shadow-none focus-visible:ring-0 rounded-none text-lg md:text-lg bg-background dark:bg-background"
            />
          </div>

          <Button
            type="submit"
            disabled={isLoading}
            className="ml-auto"
            size={"sm"}
            onClick={handleSubmit}
          >
            {isLoading ? "Saving..." : "Create Note"}
          </Button>
        </div>

        {/* Editor */}
        <div className="">
          <NoteEditor
            onContentUpdate={(json: JSON) => (contentRef.current = json)}
          />
        </div>
      </div>
    </div>
  );
}

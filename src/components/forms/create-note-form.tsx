"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useCreateNoteMutation } from "@/store/api/noteApi";

export function CreateNoteForm() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [createNote, { isLoading, data, error }] = useCreateNoteMutation();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createNote({ title, content });
  };

  return (
    <Card className="max-w-3xl mx-auto border-none shadow-none">
      <CardHeader>
        <CardTitle>Create Note</CardTitle>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title */}
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              placeholder="Enter note title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          {/* Content */}
          <div className="space-y-2">
            <Label htmlFor="content">Content</Label>
            <Textarea
              id="content"
              placeholder="Write your note here..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full h-50 max-h-100"
            />
          </div>

          {/* Submit */}
          <div className="flex justify-end gap-2">
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Saving..." : "Create Note"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
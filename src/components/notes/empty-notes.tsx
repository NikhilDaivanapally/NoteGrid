"use client";

import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

type Props = {
  title?: string;
  description?: string;
  onCreate: () => void;
};

export default function EmptyNotesState({
  title = "No notes found",
  description = "Try adjusting your filters or create a new note.",
  onCreate,
}: Props) {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-4 text-center">
      {/* Icon */}
      <div className="rounded-full bg-muted p-4">
        <Plus className="h-6 w-6 text-muted-foreground" />
      </div>

      {/* Text */}
      <div className="space-y-1">
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>

      {/* CTA */}
      <Button onClick={onCreate}>Create note</Button>
    </div>
  );
}

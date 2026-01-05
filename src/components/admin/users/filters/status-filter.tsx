"use client";

import { NoteStatus } from "@/types/notes/note-query";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../ui/select";

const StatusFilter = ({
  value,
  onChange,
}: {
  value: NoteStatus;
  onChange: (value: NoteStatus) => void;
}) => {
  return (
    <div className="flex flex-col gap-2 text-sm">
      <span className="text-muted-foreground ">Status</span>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="w-28">
          <SelectValue placeholder="Sort By" />
        </SelectTrigger>

        <SelectContent>
          <SelectItem value="active">Active</SelectItem>
          <SelectItem value="banned">Banned</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default StatusFilter;

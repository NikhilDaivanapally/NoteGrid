"use client";

import { NoteSortBy } from "@/types/notes/note-query";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../ui/select";

const SortFilter = ({
  value,
  onChange,
}: {
  value: NoteSortBy;
  onChange: (value: NoteSortBy) => void;
}) => {
  return (
    <div className="flex md:flex-col xl:flex-row items-start xl:items-center gap-2 text-sm">
      <span className="text-muted-foreground">Sort :</span>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="w-34">
          <SelectValue placeholder="Sort By" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="updatedAt">Last Updated</SelectItem>
          <SelectItem value="createdAt">Created date</SelectItem>
          <SelectItem value="title">Title (A-Z)</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default SortFilter;

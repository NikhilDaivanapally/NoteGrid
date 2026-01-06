"use client";

import { UsersSortBy } from "@/types/users/users-query";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../ui/select";

const SortFilter = ({
  value,
  onChange,
}: {
  value: UsersSortBy;
  onChange: (value: UsersSortBy) => void;
}) => {
  return (
    <div className="flex flex-col gap-2 text-sm">
      <span className="text-muted-foreground">Sort</span>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="w-34">
          <SelectValue placeholder="Sort By" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="updatedAt">Last Updated</SelectItem>
          <SelectItem value="createdAt">Created date</SelectItem>
          <SelectItem value="name">Name (A-Z)</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default SortFilter;

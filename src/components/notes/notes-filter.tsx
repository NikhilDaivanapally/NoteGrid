"use client";

import { Dispatch, SetStateAction } from "react";
import { SearchInput } from "../search/search-input";
import FilterBar from "../filter-bar";
import { DEFAULT_NOTE_QUERY } from "@/lib/constants/note-query";
import { getNotesFilterConfig } from "./get-notes-filter-config";

export default function NotesFilter({
  filters,
  onChange,
}: {
  filters: typeof DEFAULT_NOTE_QUERY;
  onChange: Dispatch<SetStateAction<Partial<typeof DEFAULT_NOTE_QUERY>>>;
}) {
  const filterConfig = getNotesFilterConfig(filters, onChange);
  return (
    <div className="flex justify-between gap-6 lg:gap-3 bg-background items-center lg:items-end m-3 mb-0 mt-0 p-3 pt-0.5 border-b">
      <SearchInput
        value={filters.search}
        onChange={(search) => onChange({ search })}
      />

      <FilterBar filters={filterConfig} />
    </div>
  );
}

"use client";

import { Dispatch, SetStateAction } from "react";
import { SearchInput } from "@/features/shared/ui/search-input";
import FilterBar from "@/features/shared/ui/filter-bar";
import { useNotesFilters } from "../../hooks/use-notes-filters";
import { DEFAULT_NOTE_QUERY } from "../../constants";

export default function NotesFilter({
  filters,
  onChange,
}: {
  filters: typeof DEFAULT_NOTE_QUERY;
  onChange: Dispatch<SetStateAction<Partial<typeof DEFAULT_NOTE_QUERY>>>;
}) {
  const filterConfig = useNotesFilters(filters, onChange);
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

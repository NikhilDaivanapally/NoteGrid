"use client";

import { Dispatch, SetStateAction } from "react";
import { SearchInput } from "../search/search-input";
import FilterBar from "./filters/filter-bar";
import { DEFAULT_NOTE_QUERY } from "@/lib/constants/note-query";
import { DateRange, NoteSortBy, NoteStatus } from "@/types/notes/note-query";

export default function NotesFilter({
  filters,
  onChange,
}: {
  filters: typeof DEFAULT_NOTE_QUERY;
  onChange: Dispatch<SetStateAction<typeof DEFAULT_NOTE_QUERY>>;
}) {
  return (
    <div className="flex justify-between gap-6 lg:gap-3 bg-background items-center lg:items-end m-3 mb-0 mt-0 p-3 pt-0.5 border-b">
      <SearchInput
        value={filters.search}
        onChange={(search) => onChange({ ...filters, search, page: 1 })}
      />
      <FilterBar
        status={filters.status!}
        dateRange={filters.dateRange!}
        sortBy={filters.sortBy!}
        onStatusChange={(status: NoteStatus) =>
          onChange({ ...filters, status, page: 1 })
        }
        onDateRangeChange={(dateRange: DateRange) =>
          onChange({ ...filters, dateRange, page: 1 })
        }
        onSortChange={(sortBy: NoteSortBy) =>
          onChange({ ...filters, sortBy, page: 1 })
        }
      />
    </div>
  );
}

"use client";

import { SelectFilter } from "@/features/shared/ui/select-filter";
import { DateRange, NoteSortBy, NoteStatus } from "@/types/notes/note-query";
import { NotesQuery } from "../types";
import { FilterConfig } from "@/features/shared/ui/filter-bar";

export function useNotesFilters(
  filters: NotesQuery,
  updateFilters: (partial: Partial<typeof filters>) => void,
): FilterConfig[] {
  return [
    {
      key: "status",
      label: "Status",
      component: SelectFilter,
      options: [
        { label: "All", value: "all" },
        { label: "Favorite", value: "favorite" },
        { label: "Pinned", value: "pinned" },
      ],
      value: filters.status,
      onChange: (value: unknown) =>
        updateFilters({ status: value as NoteStatus }),
    },
    {
      key: "dateRange",
      label: "Date Range",
      component: SelectFilter,
      options: [
        { label: "All", value: "all" },
        { label: "Today", value: "today" },
        { label: "Last 7 Days", value: "last7" },
        { label: "Last 30 Days", value: "last30" },
      ],
      value: filters.dateRange,
      onChange: (value: unknown) =>
        updateFilters({ dateRange: value as DateRange }),
    },
    {
      key: "sortBy",
      label: "Sort By",
      component: SelectFilter,
      options: [
        { label: "Last Updated", value: "updatedAt" },
        { label: "Created date", value: "createdAt" },
        { label: "Title (A-Z)", value: "title" },
      ],
      value: filters.sortBy,
      onChange: (value: unknown) =>
        updateFilters({ sortBy: value as NoteSortBy }),
    },
  ];
}

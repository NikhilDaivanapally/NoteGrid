"use client";

import { DateRange, NoteSortBy, NoteStatus } from "@/types/notes/note-query";
import StatusFilter from "./filters/status-filter";
import DateRangeFilter from "./filters/date-range-filter";
import SortFilter from "./filters/sort-filter";

export function getNotesFilterConfig(
  filters: {
    status: NoteStatus;
    dateRange: DateRange;
    sortBy: NoteSortBy;
  },
  updateFilters: (partial: Partial<typeof filters>) => void
) {
  return [
    {
      key: "status",
      component: StatusFilter,
      value: filters.status,
      onChange: (status: NoteStatus) => updateFilters({ status }),
    },
    {
      key: "dateRange",
      component: DateRangeFilter,
      value: filters.dateRange,
      onChange: (dateRange: DateRange) => updateFilters({ dateRange }),
    },
    {
      key: "sortBy",
      component: SortFilter,
      value: filters.sortBy,
      onChange: (sortBy: NoteSortBy) => updateFilters({ sortBy }),
    },
  ];
}

"use client";

import DateRangeFilter from "@/features/shared/ui/date-range-filter";
import SortFilter from "@/features/shared/ui/sort-filter";
import StatusFilter from "@/features/shared/ui/status-filter";
import { DateRange, NoteSortBy, NoteStatus } from "@/types/notes/note-query";

export function useNotesFilters(
  filters: {
    status: NoteStatus;
    dateRange: DateRange;
    sortBy: NoteSortBy;
  },
  updateFilters: (partial: Partial<typeof filters>) => void,
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

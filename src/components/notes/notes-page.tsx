"use client";

import { useNotesFilters } from "@/hooks/use-notes-filters";
import { useSyncFiltersWithUrl } from "@/hooks/use-sync-filters-with-url";
import NotesFilter from "./notes-filter";
import NotesContainer from "./notes-container";

export default function NotesPage({ initialFilters }: any) {
  const { filters, updateFilters, nextPage } = useNotesFilters(initialFilters);

  useSyncFiltersWithUrl(filters);

  return (
    <>
      <NotesFilter filters={filters} onChange={updateFilters} />
      <NotesContainer filters={filters} onLoadMore={nextPage} />
    </>
  );
}

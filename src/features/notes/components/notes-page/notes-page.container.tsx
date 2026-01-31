"use client";

import { useFilters } from "@/hooks/use-filters";
import { useSyncUrlWithFilters } from "@/features/shared/hooks";
import NotesPageView from "./notes-page.view";
import { DEFAULT_NOTE_QUERY } from "../../constants";

export default function NotesPageContainer({ initialFilters }: any) {
  const { filters, updateFilters, nextPage } = useFilters(
    DEFAULT_NOTE_QUERY,
    initialFilters,
  );

  // sync url with filters
  useSyncUrlWithFilters<typeof DEFAULT_NOTE_QUERY>(
    filters,
    DEFAULT_NOTE_QUERY,
    { excludeKeys: ["page"] },
  );

  return (
    <NotesPageView
      filters={filters}
      onFiltersChange={updateFilters}
      onLoadMore={nextPage}
    />
  );
}

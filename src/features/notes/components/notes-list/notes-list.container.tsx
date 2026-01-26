"use client";

import { useRef } from "react";
import { useInfiniteScroll } from "@/hooks/use-infinite-scroll";
import { useGetNotesQuery } from "@/features/notes/api";

import NotesListView from "./notes-list.view";
import { hasActiveFilters } from "@/features/shared/lib/has-active-filters";
import { DEFAULT_NOTE_QUERY } from "../../constants";

export default function NotesListContainer({
  filters,
  onLoadMore,
}: {
  filters: typeof DEFAULT_NOTE_QUERY;
  onLoadMore: () => void;
}) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const { data, isFetching, isLoading } = useGetNotesQuery(filters);

  useInfiniteScroll({
    ref: scrollRef,
    hasMore: data?.meta?.hasMore,
    isFetching,
    onLoadMore,
  });

  const isFiltered = hasActiveFilters(filters, DEFAULT_NOTE_QUERY);

  return (
    <NotesListView
      isLoading={isLoading}
      data={data}
      isFetching={isFetching}
      isFiltered={isFiltered}
      filters={filters}
      isFirstPage={filters.page == 1}
      ref={scrollRef}
    />
  );
}

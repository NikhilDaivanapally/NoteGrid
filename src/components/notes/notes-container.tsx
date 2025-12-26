"use client";

import { useRef } from "react";
import { useGetNotesQuery } from "@/store/api/noteApi";
import { useInfiniteScroll } from "@/hooks/use-infinite-scroll";
import { DEFAULT_LIMIT } from "@/lib/constants/pagination";
import { TextShimmer } from "../ui/text-shimmer";
import { NoteList } from "./note-list";
import { hasActiveFilters } from "@/lib/utils/has-active-filters";
import { DEFAULT_NOTE_QUERY } from "@/lib/constants/note-query";
import EmptyNotesState from "./empty-notes";

export default function NotesListContainer({
  filters,
  onLoadMore,
}: {
  filters: any;
  onLoadMore: () => void;
}) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const { data, isFetching, isLoading } = useGetNotesQuery({
    ...filters,
    limit: DEFAULT_LIMIT,
  });

  useInfiniteScroll({
    ref: scrollRef,
    hasMore: data?.meta?.hasMore,
    isFetching,
    onLoadMore,
  });

  const isFiltered = hasActiveFilters(filters, DEFAULT_NOTE_QUERY);

  return (
    <div className="flex-1 overflow-hidden p-4">
      <div ref={scrollRef} className="h-full overflow-y-auto">
        {isLoading && filters.page === 1 ? (
          <div className="h-full flex items-center justify-center">
            <TextShimmer>Fetching Notes...</TextShimmer>
          </div>
        ) : data?.data.length === 0 ? (
          <EmptyNotesState
            title={isFiltered ? "No matching notes" : "No notes yet"}
            description={
              isFiltered
                ? "Try a different keyword or clear filters."
                : "Create your first note to get started."
            }
            onCreate={() => {}}
          />
        ) : (
          <NoteList notes={data?.data ?? []} />
        )}
        {isFetching && filters.page !== 1 && (
          <div className="w-full text-center">Loading...</div>
        )}
      </div>
    </div>
  );
}

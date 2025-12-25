"use client";

import { ReactElement, useEffect, useRef, useState } from "react";
import { useGetNotesQuery } from "@/store/api/noteApi";
import { NoteList } from "./note-list";
import { Grid2X2, List } from "lucide-react";
import { Button } from "../ui/button";
import { TextShimmer } from "../ui/text-shimmer";
import { AUTO_FILL_THRESHOLD, DEFAULT_LIMIT } from "@/lib/constants/pagination";

export default function NotesContainer({ filters }: any) {
  const [page, setPage] = useState(1);
  const [allNotes, setAllNotes] = useState<any[]>([]);
  const [view, setView] = useState<"grid" | "list">("grid");

  const scrollRef = useRef<HTMLDivElement>(null);

  const { data, isFetching, isLoading } = useGetNotesQuery({
    ...filters,
    page,
    limit: DEFAULT_LIMIT,
  });

  /* Reset on filter change */
  useEffect(() => {
    setPage(1);
    setAllNotes([]);
  }, [filters]);

  useEffect(() => {
    if (!data?.data) return;
    setAllNotes(data.data);
  }, [data, page]);

  // Infinite scroll
  const onScroll = () => {
    if (!scrollRef.current) return;
    if (!data?.meta?.hasMore || isFetching) return;

    const { scrollTop, scrollHeight, clientHeight } = scrollRef.current;

    if (scrollTop + clientHeight >= scrollHeight - 100) {
      setPage((p) => p + 1);
    }
  };

  // Auto-fill data until scroll exists
  useEffect(() => {
    if (!scrollRef.current) return;
    if (isFetching) return;
    if (!data?.meta?.hasMore) return;

    const { scrollHeight, clientHeight } = scrollRef.current;

    if (scrollHeight - clientHeight <= AUTO_FILL_THRESHOLD) {
      setPage((p) => p + 1);
    }
  }, [allNotes, isFetching, data?.meta?.hasMore]);

  return (
    <div className="flex-1 w-full h-full flex flex-col p-4 pt-2 gap-2 overflow-hidden">
      {/* View Toggle */}
      <div className="bg-white dark:bg-surface-dark p-1 rounded-full flex w-fit border">
        <ToggleButton
          active={view === "grid"}
          icon={<Grid2X2 className="size-5" />}
          text="Grid"
          onClick={() => setView("grid")}
        />
        <ToggleButton
          active={view === "list"}
          icon={<List className="size-5" />}
          text="List"
          onClick={() => setView("list")}
        />
      </div>

      {/* scroll container */}
      <div
        ref={scrollRef}
        onScroll={onScroll}
        className="flex-1 overflow-y-auto min-h-0"
      >
        {isLoading && page === 1 ? (
          <div className="w-full h-full flex items-center justify-center">
            <TextShimmer>Fetching Notes...</TextShimmer>
          </div>
        ) : (
          <NoteList notes={allNotes} view={view} />
        )}
      </div>
    </div>
  );
}

function ToggleButton({
  active,
  icon,
  text,
  onClick,
}: {
  active: boolean;
  icon: ReactElement;
  text: string;
  onClick: () => void;
}) {
  return (
    <Button
      onClick={onClick}
      size="sm"
      title={text}
      className={`rounded-full text-sm transition-all ${
        active
          ? "bg-primary text-white shadow-sm"
          : "bg-transparent text-black hover:bg-transparent"
      }`}
    >
      {icon}
      {text}
    </Button>
  );
}

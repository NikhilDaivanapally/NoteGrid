"use client";

import { useSyncUrlWithFilters } from "@/hooks/use-sync-url-with-filters";
import NotesFilter from "./notes-filter";
import NotesContainer from "./notes-container";
import { PlusIcon } from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";
import { useFilters } from "@/hooks/use-filters";
import { DEFAULT_NOTE_QUERY } from "@/lib/constants/note-query";

export default function NotesPage({ initialFilters }: any) {
  const { filters, updateFilters, nextPage } = useFilters(
    DEFAULT_NOTE_QUERY,
    initialFilters
  );

  // sync url with filters
  useSyncUrlWithFilters<typeof DEFAULT_NOTE_QUERY>(
    filters,
    DEFAULT_NOTE_QUERY,
    { excludeKeys: ["page"] }
  );

  return (
    <>
      <NotesFilter filters={filters} onChange={updateFilters} />
      <NotesContainer filters={filters} onLoadMore={nextPage} />
      <Button
        className="fixed bottom-5 right-5 sm:bottom-10 sm:right-10 rounded-full"
        asChild
      >
        <Link href={"/dashboard/notes/new"}>
          <PlusIcon className="size-5 md:size-6" />
          <span>New Note</span>
        </Link>
      </Button>
    </>
  );
}

"use client";

import PageWrapper from "@/components/layout/page-wrapper";
import NotesContainer from "@/components/notes/notes-container";
import NotesFilter from "@/components/notes/notes-filter";
import { useSyncFiltersWithUrl } from "@/hooks/use-sync-filters-with-url";
import { normalizeNoteQuery } from "@/lib/utils/normalize-note-query";
import { use, useState } from "react";
import {DEFAULT_NOTE_QUERY} from '@/lib/constants/note-query'
const page = ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const params = use(searchParams);

  const query = normalizeNoteQuery(params);

  const [filters, setFilters] = useState<typeof DEFAULT_NOTE_QUERY>(query);

  // Sync Urls and filters
  useSyncFiltersWithUrl(filters);

  return (
    <PageWrapper>
      <NotesFilter filters={filters} onChange={setFilters} />
      <NotesContainer filters={filters} />
    </PageWrapper>
  );
};

export default page;

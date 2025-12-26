"use client";

import { useState } from "react";
import { DEFAULT_NOTE_QUERY } from "@/lib/constants/note-query";

export function useNotesFilters(initialFilters: any) {
  const [filters, setFilters] = useState({
    ...DEFAULT_NOTE_QUERY,
    ...initialFilters,
  });

  const updateFilters = (partial: Partial<typeof filters>) => {
    setFilters((prev: any) => ({
      ...prev,
      ...partial,
      page: partial.page ?? 1, // reset page unless explicitly set
    }));
  };

  const nextPage = () => {
    setFilters((prev: any) => ({
      ...prev,
      page: prev?.page + 1,
    }));
  };

  return {
    filters,
    setFilters,
    updateFilters,
    nextPage,
  };
}

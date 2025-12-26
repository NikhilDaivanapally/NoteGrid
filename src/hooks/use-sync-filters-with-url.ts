"use client";

import { DEFAULT_NOTE_QUERY } from "@/lib/constants/note-query";
import { useEffect } from "react";

export function useSyncFiltersWithUrl(filters: typeof DEFAULT_NOTE_QUERY) {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    Object.entries(filters).forEach(([key, value]) => {
      if (key === "page") return;
      const defaultValue =
        DEFAULT_NOTE_QUERY[key as keyof typeof DEFAULT_NOTE_QUERY];

      if (value === defaultValue || value === "" || value == null) {
        params.delete(key);
      } else {
        params.set(key, String(value));
      }
    });
    let newUrl;
    if (params.toString()) {
      newUrl = `${window.location.pathname}?${params.toString()}`;
    } else {
      newUrl = `${window.location.pathname}`;
    }
    window.history.replaceState(null, "", newUrl);
  }, [filters]);
}
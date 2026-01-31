"use client";

import { useGetUserQuery } from "@/features/auth/api";
import { useGetNotesQuery, useGetRecentNotesQuery } from "@/features/notes/api";
import { DEFAULT_NOTE_QUERY } from "@/features/notes/constants";

export function useDashboardStats() {
  const userQuery = useGetUserQuery({});

  const recentNotesQuery = useGetRecentNotesQuery({ limit: 5 });

  const pinnedNotesQuery = useGetNotesQuery({
    ...DEFAULT_NOTE_QUERY,
    status: "pinned",
  });

  const favoriteNotesQuery = useGetNotesQuery({
    ...DEFAULT_NOTE_QUERY,
    status: "favorite",
  });

  return {
    user: userQuery.data,
    recentNotes: recentNotesQuery.data,
    pinnedNotes: pinnedNotesQuery.data,
    favoriteNotes: favoriteNotesQuery.data,
    isLoading:
      userQuery.isLoading ||
      recentNotesQuery.isLoading ||
      pinnedNotesQuery.isLoading ||
      favoriteNotesQuery.isLoading,
  };
}

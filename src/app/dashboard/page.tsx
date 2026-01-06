"use client";

import NotesSection from "@/components/dashboard/note-section";
import PageWrapper from "@/components/layout/page-wrapper";
import { DEFAULT_NOTE_QUERY } from "@/lib/constants/note-query";
import { useGetNotesQuery, useGetRecentNotesQuery } from "@/store/api/noteApi";
import { useGetUserQuery } from "@/store/api/userApi";

const Page = () => {
  const { data: user } = useGetUserQuery({});
  console.log(user);
  const { data: recentNotes, isLoading } = useGetRecentNotesQuery({ limit: 5 });

  const { data: pinnedNotes } = useGetNotesQuery({
    ...DEFAULT_NOTE_QUERY,
    status: "pinned",
  });

  const { data: favoriteNotes } = useGetNotesQuery({
    ...DEFAULT_NOTE_QUERY,
    status: "favorite",
  });

  if (isLoading) {
    return (
      <PageWrapper>
        <div className="p-6 text-muted-foreground">Loading notes…</div>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper>
      <div className="px-4 py-6 space-y-8 overflow-y-auto">
        {/* Welcome */}
        <header className="space-y-1">
          <h1 className="text-2xl font-bold">
            Welcome back{user?.user?.name ? `, ${user?.user.name}` : ""}
          </h1>
          <p className="text-sm text-muted-foreground">
            Here’s a quick look at your notes
          </p>
        </header>

        {/* Sections */}
        <NotesSection title="Recent Notes" notes={recentNotes?.data} />

        <NotesSection title="Pinned Notes" notes={pinnedNotes?.data} />

        <NotesSection title="Favorites" notes={favoriteNotes?.data} />
      </div>
    </PageWrapper>
  );
};

export default Page;

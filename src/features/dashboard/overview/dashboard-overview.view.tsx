// import NotesSection from "@/components/dashboard/note-section";

import NotesSection from "../components/note-section";

const DashboardOverview = ({
  user,
  recentNotes,
  pinnedNotes,
  favoriteNotes,
}: any) => {
  return (
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
  );
};

export default DashboardOverview;

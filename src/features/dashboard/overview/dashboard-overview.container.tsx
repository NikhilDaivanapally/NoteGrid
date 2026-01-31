"use client";

import DashboardOverview from "./dashboard-overview.view";
import { useDashboardStats } from "../hooks/use-dashboard-stats";

const DashboardOverviewContainer = () => {
  const { isLoading, user, recentNotes, pinnedNotes, favoriteNotes } =
    useDashboardStats();
  if (isLoading) {
    return <div className="p-6 text-muted-foreground">Loading notes…</div>;
  }

  return (
    <DashboardOverview
      user={user}
      recentNotes={recentNotes}
      pinnedNotes={pinnedNotes}
      favoriteNotes={favoriteNotes}
    />
  );
};

export default DashboardOverviewContainer;

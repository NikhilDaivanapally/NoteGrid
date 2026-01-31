"use client";

import { StickyNote, Pin, Star } from "lucide-react";

import { useGetChartsAnalyticsQuery, useGetMetricsQuery } from "../../api";
import AnalyticsPageView from "./analytics-page.view";

const AnalyticsPageContainer = () => {
  const { data: metricsData, isLoading: metricsLoading } = useGetMetricsQuery(
    {},
  );

  const { data: chartsData, isLoading: chartsLoading } =
    useGetChartsAnalyticsQuery({});

  const notesCards = [
    {
      key: "totalNotes",
      title: "Total Notes",
      value: metricsData?.metrics?.totalNotes?.value,
      trend: metricsData?.metrics?.totalNotes?.trend,
      icon: <StickyNote className="h-4 w-4 text-muted-foreground" />,
    },
    {
      key: "pinnedNotes",
      title: "Pinned Notes",
      value: metricsData?.metrics?.pinnedNotes?.value,
      trend: metricsData?.metrics?.pinnedNotes?.trend,
      icon: <Pin className="h-4 w-4 text-muted-foreground" />,
    },
    {
      key: "favoriteNotes",
      title: "Favorite Notes",
      value: metricsData?.metrics?.favoriteNotes?.value,
      trend: metricsData?.metrics?.favoriteNotes?.trend,
      icon: <Star className="h-4 w-4 text-muted-foreground" />,
    },
  ];

  return (
    <AnalyticsPageView
      notesCards={notesCards}
      chartsLoading={chartsLoading}
      metricsLoading={metricsLoading}
      chartsData={chartsData}
      metricsData={metricsData}
    />
  );
};

export default AnalyticsPageContainer;

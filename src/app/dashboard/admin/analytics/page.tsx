"use client";

import PageWrapper from "@/components/layout/page-wrapper";
import {
  AnalyticsLayout,
  AnalyticsSection,
  AnalyticsGrid,
  AnalyticsChart,
  AnalyticsCard,
} from "@/components/admin/analytics";

import {
  AnalyticsCardSkeleton,
  AnalyticsChartSkeleton,
} from "@/components/admin/analytics/skeletons";

import {
  useGetChartsAnalyticsQuery,
  useGetMetricsQuery,
} from "@/store/api/adminApi";

import { StickyNote, Pin, Star } from "lucide-react";
import { UserActivityLineChart } from "../../../../components/admin/analytics/charts/user-activity-line-chart";
import { NotesCreatedBarChart } from "@/components/admin/analytics/charts/notes-created-bar-chart";

const AnalyticsPage = () => {
  const { data: metricsData, isLoading: metricsLoading } = useGetMetricsQuery(
    {}
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
    <PageWrapper>
      <AnalyticsLayout title="Analytics Dashboard">
        <AnalyticsSection title="Notes Activity">
          <AnalyticsGrid cols={4}>
            {metricsLoading
              ? Array.from({ length: 3 }).map((_, i) => (
                  <AnalyticsCardSkeleton key={i} />
                ))
              : notesCards.map((card) => (
                  <AnalyticsCard
                    key={card.key}
                    title={card.title}
                    value={card.value}
                    trend={card.trend}
                    icon={card.icon}
                    description="vs last 30 days"
                  />
                ))}
          </AnalyticsGrid>
        </AnalyticsSection>

        <AnalyticsSection title="Users per Month">
          <AnalyticsChart title="Monthly user growth">
            {chartsLoading ? (
              <AnalyticsChartSkeleton />
            ) : (
              <UserActivityLineChart data={chartsData?.monthly?.users ?? []} />
            )}
          </AnalyticsChart>
        </AnalyticsSection>

        <AnalyticsSection title="Notes Created per Month">
          <AnalyticsChart title="Monthly note creation activity">
            {chartsLoading ? (
              <AnalyticsChartSkeleton />
            ) : (
              <NotesCreatedBarChart data={chartsData?.monthly?.notes ?? []} />
            )}
          </AnalyticsChart>
        </AnalyticsSection>
      </AnalyticsLayout>
    </PageWrapper>
  );
};

export default AnalyticsPage;

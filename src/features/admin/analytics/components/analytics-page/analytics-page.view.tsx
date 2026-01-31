import { AnalyticsCard } from "../analytics-card";
import { AnalyticsChart } from "../analytics-chart";
import { AnalyticsGrid } from "../analytics-grid";
import { AnalyticsLayout } from "../analytics-layout";
import { AnalyticsSection } from "../analytics-section";
import { NotesCreatedBarChart } from "../charts/notes-created-bar-chart";
import { UserActivityLineChart } from "../charts/user-activity-line-chart";
import { AnalyticsCardSkeleton } from "../skeletons/analytics-card-skeleton";
import { AnalyticsChartSkeleton } from "../skeletons/analytics-chart-skeleton";

const AnalyticsPageView = ({
  notesCards,
  chartsLoading,
  metricsLoading,
  chartsData,
}: any) => {
  return (
    <AnalyticsLayout title="Analytics Dashboard">
      <AnalyticsSection title="Notes Activity">
        <AnalyticsGrid cols={4}>
          {metricsLoading
            ? Array.from({ length: 3 }).map((_, i) => (
                <AnalyticsCardSkeleton key={i} />
              ))
            : notesCards.map((card: any) => (
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
  );
};

export default AnalyticsPageView;

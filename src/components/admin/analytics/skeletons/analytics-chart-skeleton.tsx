import { Skeleton } from "@/components/ui/skeleton";

export function AnalyticsChartSkeleton() {
  return (
    <div className="h-[320px] w-full rounded-xl border p-4">
      <Skeleton className="h-full w-full" />
    </div>
  );
}

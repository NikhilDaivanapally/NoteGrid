import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export type AnalyticsChartProps = {
  title: string;
  children: React.ReactNode;
  loading?: boolean;
};

export function AnalyticsChart({
  title,
  children,
  loading,
}: AnalyticsChartProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
      </CardHeader>
      <CardContent className="h-[300px]">
        {loading ? (
          <div className="h-full w-full bg-muted animate-pulse rounded" />
        ) : (
          children
        )}
      </CardContent>
    </Card>
  );
}
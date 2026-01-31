import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ArrowDown, ArrowUp } from "lucide-react";

export type AnalyticsTrend = {
  value: number;
  direction: "up" | "down" | "neutral";
};

export type AnalyticsCardProps = {
  title: string;
  value: string | number;
  icon?: React.ReactNode;
  description?: string;
  trend?: AnalyticsTrend;
  loading?: boolean;
  onClick?: () => void;
};

export function AnalyticsCard({
  title,
  value,
  icon,
  description,
  trend,
  loading,
  onClick,
}: AnalyticsCardProps) {
  return (
    <Card
      onClick={onClick}
      className={cn(onClick && "cursor-pointer hover:shadow-md transition")}
    >
      <CardHeader className="flex flex-row items-center justify-between space-y-0">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="h-6 w-24 bg-muted animate-pulse rounded" />
        ) : (
          <div className="text-2xl font-semibold">{value}</div>
        )}

        {(trend || description) && (
          <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
            {trend && trend.direction !== "neutral" && (
              <span
                className={cn(
                  "flex items-center gap-1",
                  trend.direction === "up" && "text-green-600",
                  trend.direction === "down" && "text-red-600"
                )}
              >
                {trend.direction === "up" ? (
                  <ArrowUp className="h-3 w-3" />
                ) : (
                  <ArrowDown className="h-3 w-3" />
                )}
                {trend.value}%
              </span>
            )}
            {description && <span>{description}</span>}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

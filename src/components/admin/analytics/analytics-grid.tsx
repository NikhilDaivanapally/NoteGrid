import { ReactNode } from "react";
import { cn } from "@/lib/utils";

export type AnalyticsGridProps = {
  children: ReactNode;
  cols?: 1 | 2 | 3 | 4 | 5 | 6;
  gap?: "sm" | "md" | "lg";
};

const COLS_MAP: Record<NonNullable<AnalyticsGridProps["cols"]>, string> = {
  1: "grid-cols-1",
  2: "grid-cols-1 sm:grid-cols-2",
  3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
  4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
  5: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-5",
  6: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-6",
};

const GAP_MAP: Record<NonNullable<AnalyticsGridProps["gap"]>, string> = {
  sm: "gap-3",
  md: "gap-4",
  lg: "gap-6",
};

export function AnalyticsGrid({
  children,
  cols = 4,
  gap = "md",
}: AnalyticsGridProps) {
  return (
    <div
      className={cn(
        "grid",
        COLS_MAP[cols],
        GAP_MAP[gap]
      )}
    >
      {children}
    </div>
  );
}

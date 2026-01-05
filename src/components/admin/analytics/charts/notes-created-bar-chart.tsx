// analytics/components/notes-created-bar-chart.tsx
"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { format } from "date-fns";

type Props = {
  data: { month: string; count: number }[];
};

export function NotesCreatedBarChart({ data }: Props) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="month"
          tickFormatter={(value) => format(new Date(`${value}-01`), "MMM yyyy")}
        />
        <YAxis />
        <Tooltip
          labelFormatter={(value) =>
            format(new Date(`${value}-01`), "MMMM yyyy")
          }
        />
        <Bar dataKey="count" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}

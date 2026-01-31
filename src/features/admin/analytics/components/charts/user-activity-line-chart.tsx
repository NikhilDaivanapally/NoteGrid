"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { format, parse } from "date-fns";

type MonthlyUserData = {
  month: string; // "YYYY-MM"
  count: number;
};

type Props = {
  data: MonthlyUserData[];
};

function parseMonth(month: string) {
  // Safe parse for YYYY-MM
  return parse(month, "yyyy-MM", new Date());
}

export function UserActivityLineChart({ data }: Props) {
  return (
    <ResponsiveContainer width="100%" height={320}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />

        <XAxis
          dataKey="month"
          tickFormatter={(value) => format(parseMonth(value), "MMM yyyy")}
        />

        <YAxis allowDecimals={false} />

        <Tooltip
          labelFormatter={(value) =>
            format(parseMonth(value as string), "MMMM yyyy")
          }
        />

        <Line type="monotone" dataKey="count" strokeWidth={2} dot={false} />
      </LineChart>
    </ResponsiveContainer>
  );
}

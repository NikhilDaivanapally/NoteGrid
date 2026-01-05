import Note from "@/db/models/note.model";
import { formatMonth } from "./helpers";

export async function getNotesMonthlyAnalytics(
  months = 8
) {
  const now = new Date();
  const start = new Date(
    now.getFullYear(),
    now.getMonth() - (months - 1),
    1
  );

  const raw = await Note.aggregate([
    { $match: { createdAt: { $gte: start } } },
    {
      $group: {
        _id: {
          year: { $year: "$createdAt" },
          month: { $month: "$createdAt" },
        },
        count: { $sum: 1 },
      },
    },
  ]);

  const map = new Map<string, number>();
  raw.forEach((r) => {
    map.set(
      `${r._id.year}-${String(r._id.month).padStart(2, "0")}`,
      r.count
    );
  });

  return Array.from({ length: months }).map((_, i) => {
    const date = new Date(
      now.getFullYear(),
      now.getMonth() - (months - 1 - i),
      1
    );

    const key = formatMonth(date);
    return {
      month: key,
      count: map.get(key) ?? 0,
    };
  });
}

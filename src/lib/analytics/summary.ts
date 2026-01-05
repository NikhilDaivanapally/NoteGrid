import Note from "@/db/models/note.model";
import { UserQuery } from "@/db/models/userquery";
import { calculateTrend } from "./helpers";

export async function getSummaryAnalytics() {
  const now = new Date();
  const currentFrom = new Date(now);
  currentFrom.setDate(now.getDate() - 30);

  const previousFrom = new Date(currentFrom);
  previousFrom.setDate(previousFrom.getDate() - 30);

  const [current, previous] = await Promise.all([
    Promise.all([
      UserQuery.countDocuments({ createdAt: { $gte: currentFrom } }),
      Note.countDocuments({ createdAt: { $gte: currentFrom } }),
    ]),
    Promise.all([
      UserQuery.countDocuments({
        createdAt: { $gte: previousFrom, $lt: currentFrom },
      }),
      Note.countDocuments({
        createdAt: { $gte: previousFrom, $lt: currentFrom },
      }),
    ]),
  ]);

  return {
    users: {
      value: current[0],
      trend: calculateTrend(current[0], previous[0]),
    },
    notes: {
      value: current[1],
      trend: calculateTrend(current[1], previous[1]),
    },
  };
}

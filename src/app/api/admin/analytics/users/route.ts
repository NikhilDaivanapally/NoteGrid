import { UserQuery } from "@/db/models/userquery";
import connectToDatabase from "@/db/mongoose";
import { NextResponse } from "next/server";

function formatMonth(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  return `${year}-${month}`;
}

export async function GET() {
  try {
    await connectToDatabase();

    const now = new Date();

    // Start from beginning of month (7 months ago)
    const startDate = new Date(now.getFullYear(), now.getMonth() - 7, 1);

    const rawData = await UserQuery.aggregate([
      {
        $match: {
          createdAt: { $gte: startDate },
        },
      },
      {
        $group: {
          _id: {
            year: { $year: "$createdAt" },
            month: { $month: "$createdAt" },
          },
          count: { $sum: 1 },
        },
      },
      {
        $sort: {
          "_id.year": 1,
          "_id.month": 1,
        },
      },
    ]);

    // Build last 8 months skeleton (zero-filled)
    const months: {
      key: string;
      year: number;
      month: number;
      count: number;
    }[] = [];

    for (let i = 7; i >= 0; i--) {
      const date = new Date(now.getFullYear(), now.getMonth() - i, 1);

      months.push({
        key: formatMonth(date), // YYYY-MM
        year: date.getFullYear(),
        month: date.getMonth() + 1,
        count: 0,
      });
    }

    // 🔹 Merge DB data
    for (const item of rawData) {
      const key = `${item._id.year}-${String(item._id.month).padStart(2, "0")}`;

      const index = months.findIndex((m) => m.key === key);

      if (index !== -1) {
        months[index].count = item.count;
      }
    }

    return NextResponse.json({
      range: "last_8_months",
      data: months.map(({ key, count }) => ({
        month: key, // YYYY-MM
        users: count,
      })),
    });
  } catch (error) {
    console.error("Users monthly analytics error:", error);
    return NextResponse.json(
      { message: "Failed to fetch users analytics" },
      { status: 500 }
    );
  }
}

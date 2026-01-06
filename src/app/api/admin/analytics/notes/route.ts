import { NextResponse } from "next/server";
import Note from "@/db/models/note.model";
import connectToDatabase from "@/db/mongoose";
import { auth } from "@/lib/auth/auth";
import { headers } from "next/headers";

function calculateTrend(
  current = 0,
  previous = 0
): {
  value: number;
  direction: "up" | "down" | "neutral";
} {
  if (previous === 0 && current === 0) {
    return { value: 0, direction: "neutral" };
  }

  if (previous === 0) {
    return { value: 100, direction: "up" };
  }

  const diff = ((current - previous) / previous) * 100;

  if (diff > 0) {
    return { value: Math.round(diff), direction: "up" };
  }

  if (diff < 0) {
    return { value: Math.round(Math.abs(diff)), direction: "down" };
  }

  return { value: 0, direction: "neutral" };
}

export async function GET(req: Request) {
  try {
    await connectToDatabase();
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    if (session?.user?.role !== "admin") {
      return NextResponse.json(
        { message: "Admin only route" },
        { status: 401 }
      );
    }

    const now = new Date();
    const CURRENT_DAYS = 30;

    const currentFrom = new Date(now);
    currentFrom.setDate(now.getDate() - CURRENT_DAYS);

    const previousFrom = new Date(currentFrom);
    previousFrom.setDate(currentFrom.getDate() - CURRENT_DAYS);

    const [result] = await Note.aggregate([
      {
        $facet: {
          current: [
            { $match: { createdAt: { $gte: currentFrom } } },
            {
              $group: {
                _id: null,
                totalNotes: { $sum: 1 },
                pinnedNotes: {
                  $sum: { $cond: ["$isPinned", 1, 0] },
                },
                favoriteNotes: {
                  $sum: { $cond: ["$isFavorite", 1, 0] },
                },
              },
            },
          ],
          previous: [
            {
              $match: {
                createdAt: {
                  $gte: previousFrom,
                  $lt: currentFrom,
                },
              },
            },
            {
              $group: {
                _id: null,
                totalNotes: { $sum: 1 },
                pinnedNotes: {
                  $sum: { $cond: ["$isPinned", 1, 0] },
                },
                favoriteNotes: {
                  $sum: { $cond: ["$isFavorite", 1, 0] },
                },
              },
            },
          ],
        },
      },
    ]);

    const current = result.current[0] ?? {};
    const previous = result.previous[0] ?? {};

    const metrics = {
      totalNotes: {
        value: current.totalNotes ?? 0,
        trend: calculateTrend(current.totalNotes, previous.totalNotes),
      },
      //   avgNoteLength: {
      //     value: Math.round(current.avgNoteLength ?? 0),
      //     trend: calculateTrend(current.avgNoteLength, previous.avgNoteLength),
      //   },
      pinnedNotes: {
        value: current.pinnedNotes ?? 0,
        trend: calculateTrend(current.pinnedNotes, previous.pinnedNotes),
      },
      favoriteNotes: {
        value: current.favoriteNotes ?? 0,
        trend: calculateTrend(current.favoriteNotes, previous.favoriteNotes),
      },
    };

    return NextResponse.json({ metrics });
  } catch (error) {
    console.error("Notes analytics error:", error);
    return NextResponse.json(
      { message: "Failed to fetch notes analytics" },
      { status: 500 }
    );
  }
}

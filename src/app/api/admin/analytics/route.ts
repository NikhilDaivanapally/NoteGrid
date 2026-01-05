import { getNotesMonthlyAnalytics } from "@/lib/analytics/notes";
import { getSummaryAnalytics } from "@/lib/analytics/summary";
import { getUsersMonthlyAnalytics } from "@/lib/analytics/users";
import { auth } from "@/lib/auth/auth";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    if (session?.user.role !== "admin") {
      return NextResponse.json(
        { message: "Admin only routes" },
        { status: 401 }
      );
    }

    // fetch analytics
    const [summary, usersMonthly, notesMonthly] = await Promise.all([
      // get summary analytics
      getSummaryAnalytics(),

      // get users monthly analytics for chart
      getUsersMonthlyAnalytics(8),

      // get notes monthly analytics for chart
      getNotesMonthlyAnalytics(8),
    ]);

    return NextResponse.json(
      {
        summary,
        monthly: {
          users: usersMonthly,
          notes: notesMonthly,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Admin analytics error:", error);
    return NextResponse.json(
      { message: "Failed to load analytics" },
      { status: 500 }
    );
  }
}

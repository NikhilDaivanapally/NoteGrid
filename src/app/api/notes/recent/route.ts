import { getRecentNotes } from "@/features/notes/services";
import { NotesSortBy } from "@/features/notes/types";
import { auth } from "@/lib/auth/auth";
import { AppError } from "@/lib/errors";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });
    if (!session?.user) {
      throw new AppError("Unauthorized", 401);
    }

    const { searchParams } = new URL(req.url);

    const limit = Number(searchParams.get("limit")) || 20;
    const sortBy = (searchParams.get("sortBy") || "updatedAt") as NotesSortBy;
    const sortOrder = searchParams.get("sortOrder") === "asc" ? 1 : -1;

    const notes = await getRecentNotes({
      userId: session.user.id,
      limit,
      sortBy,
      sortOrder,
    });

    return NextResponse.json(
      {
        data: notes,
      },
      { status: 200 },
    );
  } catch (error) {
    if (error instanceof AppError) {
      return NextResponse.json(
        { message: error.message },
        { status: error.status },
      );
    }

    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
}

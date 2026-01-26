import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { auth } from "@/lib/auth/auth";
import { createNote, getNotes } from "@/features/notes/services";
import { AppError } from "@/lib/errors";
import { DateRange, NoteStatus } from "@/features/notes/types";
import { NoteSortBy } from "@/types/notes/note-query";

// GET ALL NOTES
export async function GET(req: Request) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user) {
      throw new AppError("Unauthorized", 401);
    }

    const { searchParams } = new URL(req.url);

    const data = await getNotes({
      userId: session.user.id,

      // Filters
      page: Number(searchParams.get("page")) || 1,
      limit: Number(searchParams.get("limit")) || 20,
      search: searchParams.get("search") || "",
      status: (searchParams.get("status") || "all") as NoteStatus,
      dateRange: (searchParams.get("dateRange") || "all") as DateRange,
      sortBy: (searchParams.get("sortBy") || "updatedAt") as NoteSortBy,
      sortOrder: searchParams.get("sortOrder") === "asc" ? 1 : -1,
    });
    return NextResponse.json(data);
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

// CREATE NOTE
export async function POST(req: Request) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user) {
      throw new AppError("Unauthorized", 401);
    }

    const body = await req.json();
    const { title, content } = body;

    if (!title || !content) {
      throw new AppError("Title and content are required", 400);
    }

    const note = await createNote({ userId: session.user.id, title, content });

    return NextResponse.json(note, { status: 201 });
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

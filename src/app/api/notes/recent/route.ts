import Note from "@/db/models/note.model";
import connectToDatabase from "@/db/mongoose";
import { auth } from "@/lib/auth/auth";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    await connectToDatabase();

    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);

    const limit = Number(searchParams.get("limit")) || 20;
    const sortBy = searchParams.get("sortBy") || "updatedAt";
    const sortOrder = searchParams.get("sortOrder") === "asc" ? 1 : -1;

    // Build query
    const query: any = {
      userId: session.user.id,
    };

    // Fetch data
    const notes = await Note.find(query)
      .sort({ [sortBy]: sortOrder })
      .limit(limit)
      .lean();

    return NextResponse.json(
      {
        data: notes,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("[GET /api/notes/recent]", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

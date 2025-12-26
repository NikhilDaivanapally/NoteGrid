import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import { auth } from "@/lib/auth/auth";
import connectToDatabase from "@/db/mongoose";
import Note from "@/db/models/note.model";
import { Types } from "mongoose";

// GET ALL NOTES
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

    const page = Number(searchParams.get("page")) || 1;
    const limit = Number(searchParams.get("limit")) || 20;
    const search = searchParams.get("search") || "";
    const status = searchParams.get("status") || "all";
    const dateRange = searchParams.get("dateRange") || "all";
    const sortBy = searchParams.get("sortBy") || "updatedAt";
    const sortOrder = searchParams.get("sortOrder") === "asc" ? 1 : -1;

    // Build query
    const query: any = {
      userId: session.user.id,
    };

    // Search
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { content: { $regex: search, $options: "i" } },
      ];
    }

    // Status filter
    if (status === "favorite") query.isFavorite = true;
    if (status === "pinned") query.isPinned = true;

    // Date range
    if (dateRange !== "all") {
      const now = new Date();
      let fromDate: Date | null = null;

      if (dateRange === "today") {
        fromDate = new Date(now.setHours(0, 0, 0, 0));
      } else if (dateRange === "last7") {
        fromDate = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
      } else if (dateRange === "last30") {
        fromDate = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
      }

      if (fromDate) {
        query.createdAt = { $gte: fromDate };
      }
    }

    // Fetch data
    const total = await Note.countDocuments(query);
    const notes = await Note.find(query)
      .sort({ [sortBy]: sortOrder })
      .skip((page - 1) * limit)
      .limit(limit)
      .lean();

    return NextResponse.json(
      {
        data: notes,
        meta: {
          page,
          limit,
          total,
          totalPages: Math.ceil(total / limit),
          hasMore: Math.ceil(total / limit) - page > 0 ? true : false,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("[GET /api/notes]", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

// CREATE NOTE
export async function POST(req: NextRequest) {
  try {
    await connectToDatabase();
    const session = await auth.api.getSession({
      headers: await headers(),
    });
    if (!session?.user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    const body = await req.json();
    const { title, content } = body;

    if (!title || !content) {
      return NextResponse.json(
        { message: "Title and content are required" },
        { status: 400 }
      );
    }
    const note = await Note.create({
      title,
      content,
      userId: session.user.id,
    });
    return NextResponse.json({ data: note }, { status: 201 });
  } catch (error) {
    console.error("[POST /api/notes]", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

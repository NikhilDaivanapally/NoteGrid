import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import { auth } from "@/lib/auth/auth";
import connectToDatabase from "@/db/mongoose";
import Note from "@/db/models/note.model";

// GET ALL NOTES
export async function GET() {
  try {
    await connectToDatabase();

    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const notes = await Note.find({ userId: session.user.id }).sort({
      isPinned: -1,
      createdAt: -1,
    });

    return NextResponse.json({ data: notes }, { status: 200 });
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

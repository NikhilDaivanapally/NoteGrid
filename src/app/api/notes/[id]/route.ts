import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import { auth } from "@/lib/auth/auth";
import connectToDatabase from "@/db/mongoose";
import Note from "@/db/models/note.model";
import mongoose from "mongoose";

// GET NOTE BY Id
export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  // Early validation
  if (!id) {
    return NextResponse.json({ error: "Missing note ID" }, { status: 400 });
  }

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return NextResponse.json(
      { error: "Invalid note ID format" },
      { status: 400 }
    );
  }

  try {
    await connectToDatabase();

    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user?.id) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const note = await Note.findOne({
      _id: id,
      userId: session.user.id,
    }).lean();

    if (!note) {
      return NextResponse.json({ message: "Note not found" }, { status: 404 });
    }

    return NextResponse.json({ ...note }, { status: 200 });
  } catch (error) {
    console.error("[GET /api/notes/:id]", error);
    return NextResponse.json(
      { message: "Failed to fetch note" },
      { status: 500 }
    );
  }
}

// UPDATE NOTE
export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  // Early validation
  if (!id) {
    return NextResponse.json({ error: "Missing note ID" }, { status: 400 });
  }

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return NextResponse.json(
      { error: "Invalid note ID format" },
      { status: 400 }
    );
  }

  // Parse and validate request body
  let updates: Record<string, any>;
  try {
    updates = await req.json();

    if (!updates || typeof updates !== "object" || Array.isArray(updates)) {
      return NextResponse.json(
        { error: "Invalid request body: expected a JSON object" },
        { status: 400 }
      );
    }
  } catch {
    return NextResponse.json(
      { error: "Invalid JSON payload" },
      { status: 400 }
    );
  }

  try {
    await connectToDatabase();

    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user?.id) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const note = await Note.findOneAndUpdate(
      { _id: id, userId: session.user.id },
      updates,
      { new: true, runValidators: true }
    ).lean();

    if (!note) {
      return NextResponse.json({ message: "Note not found" }, { status: 404 });
    }

    return NextResponse.json({ ...note }, { status: 200 });
  } catch (error) {
    console.error("[PUT /api/notes/:id]", error);
    return NextResponse.json(
      { error: "Failed to update note" },
      { status: 500 }
    );
  }
}

// DELETE NOTE
export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  // Early validation
  if (!id) {
    return NextResponse.json({ error: "Missing note ID" }, { status: 400 });
  }

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return NextResponse.json(
      { error: "Invalid note ID format" },
      { status: 400 }
    );
  }

  try {
    await connectToDatabase();

    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user?.id) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const note = await Note.findOneAndDelete({
      _id: id,
      userId: session.user.id,
    }).lean();

    if (!note) {
      return NextResponse.json({ message: "Note not found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "Note deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("[DELETE /api/notes/:id]", error);
    return NextResponse.json(
      { error: "Failed to delete note" },
      { status: 500 }
    );
  }
}

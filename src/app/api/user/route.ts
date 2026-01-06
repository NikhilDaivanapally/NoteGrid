import { auth } from "@/lib/auth/auth";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const requestHeaders = await headers();

    const session = await auth.api.getSession({ headers: requestHeaders });
    console.log(session, "session");

    if (!session || !session.user) {
      return NextResponse.json({ message: "Unauthenticated" }, { status: 401 });
    }

    return NextResponse.json({ user: session.user }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

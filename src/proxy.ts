import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth/auth"; // Ensure this is your auth client/instance

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // GET USER SESSION
  const session = await auth.api.getSession({
    headers: request.headers,
  });
  const isAuthenticated = session?.user;

  // AUTH PAGES
  if (isAuthenticated && (pathname === "/login" || pathname === "/register")) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // DASHBOARD PAGES
  if (pathname.startsWith("/dashboard")) {
    if (!isAuthenticated) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/login", "/register", "/dashboard/:path*"],
};

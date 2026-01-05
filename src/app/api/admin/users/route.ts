// GET USERS

import { UserQuery } from "@/db/models/userquery";
import { auth } from "@/lib/auth/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { NextResponse } from "next/server";
// import { User } from "@/lib/db/models/User";
export async function GET(req: Request) {
  try {
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

    const { searchParams } = new URL(req.url);

    const page = Number(searchParams.get("page")) || 1;
    const limit = Number(searchParams.get("limit")) || 10;
    const search = searchParams.get("search") || "";
    const role = searchParams.get("role") || "all";
    const status = searchParams.get("status") || "active";
    const authenticatedMethod =
      searchParams.get("authenticatedMethod") || "all";
    const createdFrom = searchParams.get("createdFrom") || "";
    const createdTo = searchParams.get("createdTo") || "";
    const sortBy = searchParams.get("sortBy") || "createdAt";
    const sortOrder = searchParams.get("sortOrder") == "asc" ? 1 : -1;

    // Build query
    const query: any = {};

    // Search
    if (search) {
      query.$or = [
        { email: { $regex: search, $options: "i" } },
        { name: { $regex: search, $options: "i" } },
      ];
    }

    // Role
    if (role !== "all") {
      query.role = role;
    }

    // Status
    if (status !== "active") {
      query.banned = true;
    }

    // authenticated
    if (authenticatedMethod !== "all") {
      query.provider = authenticatedMethod;
    }

    // CreatedAt
    if (createdFrom && createdTo) {
      query.createdAt = {
        $gte: new Date(createdFrom),
        $lte: new Date(createdTo),
      };
    }
    console.log(query, "query");
    const total = await UserQuery.countDocuments(query);
    const users = await UserQuery.find(query)
      .sort({ [sortBy]: sortOrder })
      .skip((page - 1) * limit)
      .limit(limit)
      .lean();

    return NextResponse.json(
      {
        data: users,
        meta: {
          page,
          limit,
          total,
          totalPages: Math.ceil(total / limit),
          hasNextPage: Math.ceil(total / limit) - page > 0 ? true : false,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("[GET /api/admin/users]", error);
    return NextResponse.json(
      { message: "Failed to fetch users" },
      { status: 500 }
    );
  }

  //   const hasAccess = await auth.api.userHasPermission({
  //     headers: await headers(),
  //     body: { permission: { user: ["list"] } },
  //   });

  //   if (!hasAccess.success) return redirect("/dashboard");

  //   //   const users = await auth.api.listUsers({
  //   //     headers: await headers(),
  //   //     query: { limit: 100, sortBy: "createdAt", sortDirection: "desc",searchField:'role' },
  //   //   });

  //   const users = await UserQuery.find({});

  //   console.log(users, "users");

  //   return {};
}

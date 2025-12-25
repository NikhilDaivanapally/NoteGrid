"use client";

import * as React from "react";
import { NavMain } from "@/components/layout/nav-main";
import { NavUser } from "@/components/layout/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenuButton,
  SidebarRail,
} from "@/components/ui/sidebar";
import { sidebarNav } from "@/lib/sidebar-nav";
import { useGetUserQuery } from "@/store/api/userApi";
import { Skeleton } from "../ui/skeleton";

export function AppSidebar(props: React.ComponentProps<typeof Sidebar>) {
  const { isFetching, data: user } = useGetUserQuery({});

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenuButton>
          <svg
            width="200"
            height="200"
            className="scale-200"
            viewBox="0 0 200 200"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 30
      C120 30 135 45 140 60
      C155 65 170 80 170 100
      C170 120 155 135 140 140
      C135 155 120 170 100 170
      C80 170 65 155 60 140
      C45 135 30 120 30 100
      C30 80 45 65 60 60
      C65 45 80 30 100 30
      Z"
              fill="black"
            />
          </svg>

          <h2 className="text-xl font-semibold p-2">NoteGrid.</h2>
        </SidebarMenuButton>
      </SidebarHeader>

      <SidebarContent>
        <NavMain items={sidebarNav} />
      </SidebarContent>

      <SidebarFooter>
        {isFetching && !user ? (
          <div className="h-12 w-full p-2 flex items-center gap-2">
            <Skeleton className="h-8 w-8 p-2 bg-black/10 rounded-full" />
            <div className="space-y-2 flex-1">
              <Skeleton className="h-2.5 w-1/2 bg-black/10" />
              <Skeleton className="h-2.5 w-full bg-black/10" />
            </div>
          </div>
        ) : (
          <NavUser user={user?.user} />
        )}
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
}

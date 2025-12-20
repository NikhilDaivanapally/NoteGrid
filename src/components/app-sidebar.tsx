"use client";

import * as React from "react";
import { Settings2 } from "lucide-react";

import { NavMain } from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenuButton,
  SidebarRail,
  useSidebar,
} from "@/components/ui/sidebar";
import { sidebarNav } from "@/lib/sidebar-nav";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

const user = {
  name: "user",
  email: "user@example.com",
  avatar: "",
};

export function AppSidebar(props: React.ComponentProps<typeof Sidebar>) {
  const router = useRouter();
  const { setOpenMobile } = useSidebar();

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
        <SidebarMenuButton
          tooltip={"settings"}
          onClick={() => {
            setOpenMobile(false);
            router.push("/dashboard/settings");
          }}
          className={cn("gap-2 cursor-pointer flex justify-center")}
        >
          <Settings2 size={18} />
          <span>Settings</span>
        </SidebarMenuButton>
        <NavUser user={user} />
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
}

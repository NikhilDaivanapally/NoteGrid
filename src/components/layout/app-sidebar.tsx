"use client";

import * as React from "react";
import { NavUser } from "@/components/layout/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { useGetUserQuery } from "@/store/api/userApi";
import { Skeleton } from "../ui/skeleton";
import { useSidebarMenu } from "@/hooks/use-sidebar-menu";
import { useSidebar } from "@/components/ui/sidebar";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import Link from "next/link";

export function AppSidebar(props: React.ComponentProps<typeof Sidebar>) {
  const router = useRouter();

  const { isFetching, data: user } = useGetUserQuery({});
  const sections = useSidebarMenu();
  const { open, setOpenMobile } = useSidebar();
  console.log(open, "open-desktop-menu");
  const pathname = usePathname();

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
        {sections.map((section) => {
          if (
            !section?.loading &&
            section?.hideIfEmpty &&
            section?.items.length === 0
          ) {
            return null;
          }
          if (section?.id == "activity" && !open) {
            return null;
          }
          return (
            <SidebarGroup key={section?.id}>
              <SidebarGroupLabel>{section?.label}</SidebarGroupLabel>
              <SidebarMenu>
                {section?.items.map((item) => {
                  const isActive =
                    item.href === pathname && item.label !== "See more";
                  if (section?.loading) {
                    return <Skeleton key={item.id} className="h-8 w-full bg-muted-foreground/10" />;
                  }
                  return (
                    <SidebarMenuItem key={item.id}>
                      <SidebarMenuButton
                        tooltip={item.label}
                        onClick={() => {
                          setOpenMobile(false);
                          router.push(item.href as string);
                        }}
                        className={cn(
                          "gap-2 cursor-pointer",
                          isActive && "bg-black/10 dark:bg-white/10"
                        )}
                        asChild
                      >
                        <Link href={item.href as string}>
                          {item.icon && <item.icon size={18} />}
                          <span>{item.label}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroup>
          );
        })}
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

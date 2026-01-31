"use client";

import * as React from "react";

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
import { useSidebar } from "@/components/ui/sidebar";
import { usePathname, useRouter } from "next/navigation";

import { useGetUserQuery } from "@/features/auth/api";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";
import { useSidebarMenu } from "../hooks/use-sidebar-menu";
import { NavUser } from "./nav-user";
import { Logo } from "@/components/branding/Logo";
import { APP_NAME } from "@/config/site";

export function AppSidebar(props: React.ComponentProps<typeof Sidebar>) {
  const router = useRouter();

  const { isFetching, data: user } = useGetUserQuery({});
  const sections = useSidebarMenu();
  const { open, setOpenMobile } = useSidebar();
  const pathname = usePathname();

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenuButton>
          <Logo className="">
            {/* <Link
              href={"/"}
              aria-label={`${APP_NAME} home`}
              className="inline-flex items-center gap-2"
            > */}
            <span className="sr-only">{APP_NAME}</span>
            <Logo.Icon size="md" />
            <Logo.Title size="lg" className="hidden md:flex" />
            {/* </Link> */}
          </Logo>
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
                    return (
                      <Skeleton
                        key={item.id}
                        className="h-8 w-full bg-muted-foreground/10"
                      />
                    );
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
                          isActive && "bg-black/10 dark:bg-white/10",
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

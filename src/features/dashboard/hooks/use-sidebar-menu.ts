"use client";

import { Ellipsis, StickyNote } from "lucide-react";
import { sidebarConfig } from "@/lib/config/sidebar";
import { SidebarItem, SidebarSection } from "../types";
import { useGetRecentNotesQuery } from "@/features/notes/api";
import { useGetUserQuery } from "@/features/auth/api";

export function useSidebarMenu(): (SidebarSection | null)[] {
  const { data, isLoading } = useGetRecentNotesQuery({ limit: 5 });
  const { data: user, isLoading: isUserLoading } = useGetUserQuery({});
  return sidebarConfig
    .map((section) => {
      if (section.id == "admin")
        return isUserLoading
          ? null
          : user.user.role !== "admin"
            ? null
            : section;
      if (section.id !== "activity") return section;
      let items: SidebarItem[];

      if (isLoading) {
        // reserve space → no layout shift
        items = Array.from({ length: 6 }).map((_, i) => ({
          id: `recent-skeleton-${i}`,
          isSkeleton: true,
        }));
      } else {
        items =
          data?.data.map((note) => ({
            id: note._id,
            label: note.title || "Untitled",
            icon: StickyNote,
            href: `/dashboard/notes/${note._id}`,
          })) ?? [];
        if (data?.data.length) {
          items.push({
            id: "See more",
            label: "See more",
            icon: Ellipsis,
            href: "/dashboard/notes",
          });
        }
      }
      return {
        ...section,
        loading: isLoading,
        items,
      };
    })
    .filter((n) => n);
}

"use client";
import { sidebarConfig } from "@/lib/config/sidebar";
import { useGetRecentNotesQuery } from "@/store/api/noteApi";
import { SidebarItem, SidebarSection } from "@/types/sidebar";
import { Ellipsis, StickyNote } from "lucide-react";

export function useSidebarMenu(): SidebarSection[] {
  const { data, isLoading } = useGetRecentNotesQuery({ limit: 5 });

  return sidebarConfig.map((section) => {
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
  });
}

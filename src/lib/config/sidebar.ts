import { SidebarSection } from "@/types/sidebar";
import { BookOpen, LayoutDashboard, Plus, Settings } from "lucide-react";

export const sidebarConfig: SidebarSection[] = [
  {
    id: "main",
    label: "Main",
    items: [
      {
        id: "dashboard",
        label: "Dashboard",
        href: "/dashboard",
        icon: LayoutDashboard,
      },
      {
        id: "notes",
        label: "Notes",
        href: "/dashboard/notes",
        icon: BookOpen,
      },
      {
        id: "new-note",
        label: "New Note",
        icon: Plus,
        href: "/dashboard/notes/new",
      },
    ],
  },
  {
    id: "activity",
    label: "Recent",
    hideIfEmpty: true,
    items: [],
  },
  {
    id: "system",
    label: "System",
    items: [
      {
        id: "settings",
        label: "Settings",
        href: "/dashboard/settings",
        icon: Settings,
      },
    ],
  },
];

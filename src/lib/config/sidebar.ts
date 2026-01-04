import { SidebarSection } from "@/types/sidebar";
import {
  BarChart3,
  BookOpen,
  LayoutDashboard,
  Plus,
  Settings,
  UserCog,
} from "lucide-react";

export const sidebarConfig: SidebarSection[] = [
  {
    id: "admin",
    label: "Admin",
    items: [
      {
        id: "users-access",
        label: "Users & Access",
        href: "/dashboard/admin/users-access",
        icon: UserCog,
      },
      {
        id: "analytics",
        label: "Analytics",
        href: "/dashboard/admin/analytics",
        icon: BarChart3,
      },
    ],
  },
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

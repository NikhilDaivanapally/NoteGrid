import { BookOpen, Star, Pin, LayoutDashboard, Settings2 } from "lucide-react";

export const sidebarNav = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "All Notes",
    href: "/dashboard/notes",
    icon: BookOpen,
  },
  {
    title: "Favorites",
    href: "/dashboard/favorites",
    icon: Star,
  },
  {
    title: "Pinned",
    href: "/dashboard/pinned",
    icon: Pin,
  },

  {
    title: "Settings",
    href: "/dashboard/settings",
    icon: Settings2,
  },
];

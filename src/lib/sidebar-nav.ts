import { BookOpen, Star, Pin, LayoutDashboard } from "lucide-react";

export const sidebarNav = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "All Notes",
    href: "/dashboard/all",
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
];

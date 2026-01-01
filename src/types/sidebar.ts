// src/types/sidebar.ts
import { LucideIcon } from "lucide-react";

export type SidebarItem = {
  id: string;
  label?: string;
  href?: string;
  icon?: LucideIcon;
  isSkeleton?: boolean;
};

export type SidebarSection = {
  id: string;
  label: string;
  items: SidebarItem[];
  hideIfEmpty?: boolean;
  loading?: boolean;
};

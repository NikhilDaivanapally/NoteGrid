"use client";

import { usePathname, useRouter } from "next/navigation";
import type { LucideIcon } from "lucide-react";

import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import Link from "next/link";

type NavItem = {
  title: string;
  href: string;
  icon?: LucideIcon;
};

export function NavMain({ items }: { items: NavItem[] }) {
  const pathname = usePathname();
  const router = useRouter();
  const { setOpenMobile } = useSidebar();

  return (
    <nav className="p-2 h-full">
      <SidebarMenu className="w-full h-full">
        {items.map((item) => {
          const isActive =
            pathname === item.href ||
            (item.href !== "/dashboard" && pathname.startsWith(item.href));
          const isSettings =
            item.title == "Settings" && item.href == "/dashboard/settings";
          return (
            <SidebarMenuItem
              key={item.title}
              className={cn(isSettings && "mt-auto")}
            >
              <SidebarMenuButton
                tooltip={item.title}
                onClick={() => {
                  setOpenMobile(false);
                  router.push(item.href);
                }}
                className={cn(
                  "gap-2 cursor-pointer",
                  isSettings && "gap-2 cursor-pointer flex justify-center",
                  isActive && "bg-black/10 dark:bg-white/10"
                )}
                asChild
              >
                <Link href={item.href}>
                  {item.icon && <item.icon size={18} />}
                  <span>{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          );
        })}
      </SidebarMenu>
    </nav>
  );
}

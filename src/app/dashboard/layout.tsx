import { ReactNode } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Metadata } from "next";
import { AppSidebar } from "@/components/layout/app-sidebar";

export const metadata: Metadata = {
  title: "Dashboard",
};

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <SidebarProvider>
      <aside>
        <AppSidebar />
      </aside>
      <main className="flex-1 flex flex-col overflow-hidden h-full">
        {children}
      </main>
    </SidebarProvider>
  );
};

export default layout;

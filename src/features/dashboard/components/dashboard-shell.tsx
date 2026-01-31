import { SidebarProvider } from "@/components/ui/sidebar";
import Header from "./app-header";
import { AppSidebar } from "./app-sidebar";

const DashboardShell = ({ children }: { children: React.ReactNode }) => {
  return (
    <SidebarProvider>
      <aside>
        <AppSidebar />
      </aside>

      <div className="flex-1 h-full flex flex-col  overflow-hidden">
        <Header />
        <main className="flex-1 h-full flex flex-col overflow-hidden">
          {children}
        </main>
      </div>
    </SidebarProvider>
  );
};

export default DashboardShell;

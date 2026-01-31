import { Metadata } from "next";
import DashboardShell from "@/features/dashboard/components/dashboard-shell";

export const metadata: Metadata = {
  title: "Dashboard",
};

const layout = ({ children }: { children: React.ReactNode }) => {
  return <DashboardShell>{children}</DashboardShell>;
};

export default layout;

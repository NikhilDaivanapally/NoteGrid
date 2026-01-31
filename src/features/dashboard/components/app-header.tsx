import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { AppBreadcrumb } from "./app-breadcrumb";

const Header = () => {
  return (
    <header className="flex p-4 shrink-0 items-center gap-2 transition-[width,height] ease-linear">
      <SidebarTrigger className="-ml-1" />
      <Separator
        orientation="vertical"
        className="mr-2 data-[orientation=vertical]:h-4"
      />
      <AppBreadcrumb />
    </header>
  );
};

export default Header;

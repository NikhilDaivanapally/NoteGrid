import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "../ui/sidebar";
import { DynamicBreadcrumb } from "./dynamic-breadcrumb";

const PageWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <header className="flex p-4 shrink-0 items-center gap-2 transition-[width,height] ease-linear">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mr-2 data-[orientation=vertical]:h-4"
        />
        <DynamicBreadcrumb />
      </header>

      <section className="flex-1 h-full flex flex-col  overflow-hidden">
        {children}
      </section>
    </>
  );
};

export default PageWrapper;

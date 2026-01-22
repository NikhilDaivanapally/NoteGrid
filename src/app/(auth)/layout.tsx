import { Logo } from "@/components/branding/Logo";
import { APP_NAME } from "@/config/site";
import Link from "next/link";

const layout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <>
      <header>
        <Logo className="fixed top-5 left-5">
          <Link
            href={"/"}
            aria-label={`${APP_NAME} home`}
            className="inline-flex items-center gap-2"
          >
            <span className="sr-only">{APP_NAME}</span>
            <Logo.Icon size="md" />
            <Logo.Title size="md" className="hidden md:flex" />
          </Link>
        </Logo>
      </header>
      <main className="w-full min-h-screen flex items-center justify-center">
        {children}
      </main>
    </>
  );
};

export default layout;

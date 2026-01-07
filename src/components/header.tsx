"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";

const HeroHeader = () => {
  return (
    <header>
      <nav className="fixed left-0 right-0 top-0 z-20 border-b border-dashed bg-white backdrop-blur dark:bg-zinc-950/50">
        <div className="mx-auto max-w-5xl px-6">
          <div className="flex h-16 items-center justify-between">
            {/* Left: App Logo + Name */}
            <Link href="/" className="flex items-center gap-2">
              <Image
                src="/notegird-logo.png"
                alt="logo"
                width={35}
                height={35}
              />

              <span className="font-semibold tracking-tight">
                NoteGrid
              </span>
            </Link>

            {/* Right: Auth Actions */}
            <div className="flex items-center gap-3">
              <Button asChild variant="outline" size="sm">
                <Link href="/login">Login</Link>
              </Button>

              <Button asChild size="sm">
                <Link href="/register">Sign Up</Link>
              </Button>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default HeroHeader;

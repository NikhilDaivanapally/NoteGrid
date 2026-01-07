"use client";
import React from "react";
import Link from "next/link";
import { Logo } from "@/components/logo";
import { Plus, StickyNote } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function NoteGridHero() {
  return (
    <main className="overflow-hidden">
      <section>
        <div className="relative pt-24">
          <div className="mx-auto max-w-7xl px-6">
            {/* App Intro */}
            <div className="max-w-3xl text-center sm:mx-auto lg:mr-auto lg:mt-0 lg:w-4/5">
              <div className="mx-auto flex w-fit items-center gap-2 rounded-full border px-3 py-1 text-sm text-muted-foreground">
                <StickyNote className="size-4" />
                <span>All notes synced in real-time</span>
              </div>

              <h1 className="mt-8 text-balance text-4xl font-semibold md:text-5xl xl:text-6xl xl:[line-height:1.125]">
                Capture ideas.<br className="hidden sm:block" />
                Organize everything.
              </h1>

              <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
                A fast, distraction-free note-taking app with folders, tags,
                pinning, and instant search — built for daily thinking.
              </p>

              {/* Actions */}
              <div className="mt-8 flex justify-center gap-3">
                <Button size="lg" asChild>
                  <Link href="/notes/new">
                    <Plus className="size-4" />
                    <span>Create Note</span>
                  </Link>
                </Button>

                <Button size="lg" variant="outline" asChild>
                  <Link href="/notes">
                    <span>View Notes</span>
                  </Link>
                </Button>
              </div>
            </div>
          </div>

          {/* Notes Grid Preview */}
          <div className="relative mx-auto mt-16 max-w-6xl overflow-hidden px-4">
            <Image
              className="relative rounded-2xl border border-border/30 dark:hidden"
              src="/herosection.png"
              alt="Note grid preview"
              width={2800}
              height={1800}
              priority
            />
            <Image
              className="relative hidden rounded-2xl border border-border/30 dark:block"
              src="/herosection.png"
              alt="Note grid preview"
              width={2800}
              height={1800}
            />
          </div>
        </div>
      </section>
    </main>
  );
}

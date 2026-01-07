import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Lock, Zap, HardDrive } from "lucide-react";

export default function CallToAction() {
  return (
    <section className="py-16 md:py-32">
      <div className="mx-auto max-w-5xl px-6">
        <div className="text-center">
          <h2 className="text-balance text-4xl font-semibold lg:text-5xl">
            Build Your Mind Like a Developer
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            Capture ideas instantly, organize them with precision, and keep
            everything private. A note system designed for deep work.
          </p>

          {/* Action Buttons */}
          <div className="mt-12 flex flex-wrap justify-center gap-4">
            <Button asChild size="lg">
              <Link href="/dashboard">
                <span>Start Taking Notes</span>
              </Link>
            </Button>

            <Button asChild size="lg" variant="outline">
              <Link href="/dashboard/notes">
                <span>View Demo Notes</span>
              </Link>
            </Button>
          </div>

          {/* Trust Signals */}
          <div className="mt-8 flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
            <span className="flex items-center gap-2">
              <Zap className="size-4" /> Instant setup
            </span>

            <span className="flex items-center gap-2">
              <Lock className="size-4" /> Private by default
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

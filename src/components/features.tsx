import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  NotebookPen,
  Code,
  ShieldCheck,
  Search,
  Layers,
  Sparkles,
} from "lucide-react";
import { ReactNode } from "react";

export default function Features() {
  return (
    <section className="py-16 md:py-32 dark:bg-transparent">
      <div className="@container mx-auto max-w-5xl px-6">
        {/* Header */}
        <div className="text-center">
          <h2 className="text-balance text-4xl font-semibold lg:text-5xl">
            Built for Daily Thinking
          </h2>
          <p className="mt-4 text-muted-foreground">
            A fast, structured, and secure note system designed for developers
            and knowledge workers.
          </p>
        </div>

        {/* Grid */}
        <div className="@min-4xl:max-w-full @min-4xl:grid-cols-3 mx-auto mt-8 grid max-w-sm gap-6 *:text-center md:mt-16">
          <FeatureCard
            title="Instant Capture"
            description="Create notes instantly with keyboard shortcuts, auto-save, and zero-friction input."
            icon={<NotebookPen className="size-6" aria-hidden />}
          />

          {/* <FeatureCard
            title="Powerful Organization"
            description="Folders, tags, pinning, and smart filters help you find any note in seconds."
            icon={<Layers className="size-6" aria-hidden />}
          /> */}

          <FeatureCard
            title="Developer Ready"
            description="Markdown, syntax highlighting, code blocks, and version history built-in."
            icon={<Code className="size-6" aria-hidden />}
          />

          <FeatureCard
            title="Fast Search"
            description="Blazing-fast full-text search across titles and content."
            icon={<Search className="size-6" aria-hidden />}
          />

          {/* <FeatureCard
            title="Smart Enhancements"
            description="Templates, AI-assisted summaries, and note linking to grow your knowledge graph."
            icon={<Sparkles className="size-6" aria-hidden />}
          /> */}

          {/* <FeatureCard
            title="Private & Secure"
            description="Local-first storage with optional end-to-end encryption. Your notes stay yours."
            icon={<ShieldCheck className="size-6" aria-hidden />}
          /> */}
        </div>
      </div>
    </section>
  );
}

function FeatureCard({
  title,
  description,
  icon,
}: {
  title: string;
  description: string;
  icon: ReactNode;
}) {
  return (
    <Card className="group bg-background">
      <CardHeader className="pb-3">
        <CardDecorator>{icon}</CardDecorator>
        <h3 className="mt-6 font-medium">{title}</h3>
      </CardHeader>

      <CardContent>
        <p className="mt-3 text-sm text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
}

const CardDecorator = ({ children }: { children: ReactNode }) => (
  <div className="relative mx-auto size-36 duration-200 [--color-border:color-mix(in_oklab,var(--color-zinc-950)10%,transparent)] group-hover:[--color-border:color-mix(in_oklab,var(--color-zinc-950)20%,transparent)] dark:[--color-border:color-mix(in_oklab,var(--color-white)15%,transparent)] dark:group-hover:bg-white/5 dark:group-hover:[--color-border:color-mix(in_oklab,var(--color-white)20%,transparent)]">
    <div
      aria-hidden
      className="absolute inset-0 bg-[linear-gradient(to_right,var(--color-border)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-border)_1px,transparent_1px)] bg-[size:24px_24px]"
    />
    <div
      aria-hidden
      className="bg-radial to-background absolute inset-0 from-transparent to-75%"
    />
    <div className="bg-background absolute inset-0 m-auto flex size-12 items-center justify-center border-l border-t">
      {children}
    </div>
  </div>
);

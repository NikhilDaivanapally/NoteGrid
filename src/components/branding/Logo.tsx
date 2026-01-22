import { APP_NAME } from "@/config/site";
import { cn } from "@/lib/utils";
import * as React from "react";

// Types & config

export type LogoSize = "sm" | "md" | "lg";

const ICON_SIZE: Record<LogoSize, string> = {
  sm: "w-6 h-6",
  md: "w-8 h-8",
  lg: "w-12 h-12",
};

const TITLE_SIZE: Record<LogoSize, string> = {
  sm: "text-sm font-semibold",
  md: "text-base font-semibold",
  lg: "text-xl font-bold",
};

// Logo (ROOT)

function Logo({
  className,
  children,
  ...props
}: { asChild?: boolean } & React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("inline-flex items-center gap-2", className)} {...props}>
      {children}
    </div>
  );
}

// Logo.Icon

function LogoIcon({
  size = "md",
  className,
  ...props
}: React.SVGProps<SVGSVGElement> & { size?: LogoSize }) {
  return (
    <svg
      viewBox="0 0 200 200"
      aria-hidden
      fill="currentColor"
      className={cn(ICON_SIZE[size], className)}
      {...props}
    >
      <path d="M100 30 C120 30 135 45 140 60 C155 65 170 80 170 100 C170 120 155 135 140 140 C135 155 120 170 100 170 C80 170 65 155 60 140 C45 135 30 120 30 100 C30 80 45 65 60 60 C65 45 80 30 100 30 Z" />
    </svg>
  );
}

// Logo.Title

function LogoTitle({
  size = "md",
  className,
  children = APP_NAME,
  ...props
}: React.HTMLAttributes<HTMLSpanElement> & { size?: LogoSize }) {
  return (
    <span className={cn(TITLE_SIZE[size], className)} {...props}>
      {children}
    </span>
  );
}

Logo.Icon = LogoIcon;
Logo.Title = LogoTitle;

export { Logo };

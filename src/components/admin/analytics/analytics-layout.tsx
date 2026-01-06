import { ReactNode } from "react";

export function AnalyticsLayout({
  title,
  description,
  actions,
  filters,
  children,
}: {
  title: string;
  description?: string;
  actions?: ReactNode;
  filters?: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className="space-y-6 p-4 overflow-y-auto overflow-x-hidden">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
          {description && (
            <p className="text-sm text-muted-foreground">{description}</p>
          )}
        </div>
        {actions && <div className="flex items-center gap-2">{actions}</div>}
      </div>

      {/* Filters */}
      {filters && (
        <div className="rounded-lg border bg-card p-4">{filters}</div>
      )}

      {/* Content */}
      <div className="space-y-8">{children}</div>
    </div>
  );
}

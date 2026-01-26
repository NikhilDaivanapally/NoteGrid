import Link from "next/link";
import { ReactNode } from "react";

type Props = {
  icon?: ReactNode;
  title: string;
  description?: string;
  actionLabel?: string;
  actionHref?: string;
};

const EmptyState = ({
  icon,
  title,
  description,
  actionLabel,
  actionHref,
}: Props) => {
  return (
    <div className="flex flex-col items-center justify-center text-center py-20 gap-4">
      <div className="flex size-14 items-center justify-center rounded-full bg-muted">
        {icon}
      </div>

      <h2 className="text-lg font-semibold">{title}</h2>

      {description && (
        <p className="text-sm text-muted-foreground max-w-sm">{description}</p>
      )}

      {actionLabel && actionHref && (
        <Link
          href={actionHref}
          className="mt-4 inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-primary-foreground"
        >
          {actionLabel}
        </Link>
      )}
    </div>
  );
};

export default EmptyState;

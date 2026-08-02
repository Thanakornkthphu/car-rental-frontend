import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import { Inbox } from "lucide-react";

interface EmptyStateProps {
  title: string;
  description?: string;
  icon?: LucideIcon;
  actionHref?: string;
  actionLabel?: string;
  testId: string;
}

export function EmptyState({ title, description, icon: Icon = Inbox, actionHref, actionLabel, testId }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center gap-3 rounded-card border border-dashed border-border p-12 text-center" data-testid={testId}>
      <Icon className="size-8 text-muted-foreground" aria-hidden="true" />
      <p className="font-medium text-foreground">{title}</p>
      {description && <p className="text-sm text-muted-foreground">{description}</p>}
      {actionHref && actionLabel && (
        <Link
          href={actionHref}
          data-testid={`${testId}-action-link`}
          className="mt-2 text-sm font-medium text-brand hover:underline"
        >
          {actionLabel}
        </Link>
      )}
    </div>
  );
}

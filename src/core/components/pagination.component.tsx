import Link from "next/link";
import { cn } from "@/core/utils/cn.util";

interface PaginationProps {
  page: number;
  totalPages: number;
  basePath: string;
  searchParams?: Record<string, string | undefined>;
  testId: string;
}

function buildHref(basePath: string, page: number, searchParams: Record<string, string | undefined> = {}) {
  const params = new URLSearchParams();
  for (const [key, value] of Object.entries(searchParams)) {
    if (value) params.set(key, value);
  }
  params.set("page", String(page));
  return `${basePath}?${params.toString()}`;
}

export function Pagination({ page, totalPages, basePath, searchParams, testId }: PaginationProps) {
  if (totalPages <= 1) return null;

  return (
    <nav className="flex items-center justify-center gap-2" data-testid={testId} aria-label="Pagination">
      {Array.from({ length: totalPages }, (_, index) => index + 1).map((pageNumber) => (
        <Link
          key={pageNumber}
          href={buildHref(basePath, pageNumber, searchParams)}
          data-testid={`${testId}-page-${pageNumber}-link`}
          className={cn(
            "flex size-9 items-center justify-center rounded-button text-sm",
            pageNumber === page ? "bg-brand text-brand-foreground" : "border border-border text-foreground hover:bg-surface"
          )}
          aria-current={pageNumber === page ? "page" : undefined}
        >
          {pageNumber}
        </Link>
      ))}
    </nav>
  );
}

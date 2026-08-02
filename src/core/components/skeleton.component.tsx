import { cn } from "@/core/utils/cn.util";

interface SkeletonProps {
  className?: string;
}

export function Skeleton({ className }: SkeletonProps) {
  return <div className={cn("animate-pulse rounded-card bg-border/60", className)} aria-hidden="true" />;
}

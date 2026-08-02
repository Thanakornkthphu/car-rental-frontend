import { cn } from "@/core/utils/cn.util";

export type BadgeColor = "brand" | "neutral" | "amber" | "blue" | "emerald" | "red";

const COLOR_CLASSES: Record<BadgeColor, string> = {
  brand: "bg-brand/10 text-brand",
  neutral: "bg-border/50 text-muted-foreground",
  amber: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
  blue: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
  emerald: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  red: "bg-red-500/10 text-red-600 dark:text-red-400",
};

interface BadgeProps {
  color?: BadgeColor;
  children: React.ReactNode;
  className?: string;
}

export function Badge({ color = "neutral", children, className }: BadgeProps) {
  return (
    <span className={cn("inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium", COLOR_CLASSES[color], className)}>
      {children}
    </span>
  );
}

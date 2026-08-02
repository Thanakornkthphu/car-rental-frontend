import { cn } from "@/core/utils/cn.util";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  padding?: "sm" | "md" | "lg";
}

const PADDING_CLASSES = {
  sm: "p-4",
  md: "p-6",
  lg: "p-8",
};

export function Card({ padding = "md", className, children, ...rest }: CardProps) {
  return (
    <div
      className={cn("rounded-card border border-border bg-surface", PADDING_CLASSES[padding], className)}
      {...rest}
    >
      {children}
    </div>
  );
}

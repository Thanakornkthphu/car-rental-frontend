import { Loader2 } from "lucide-react";
import { cn } from "@/core/utils/cn.util";

export type ButtonVariant = "primary" | "secondary" | "outline" | "ghost" | "destructive";
export type ButtonSize = "sm" | "md" | "lg";

const VARIANT_CLASSES: Record<ButtonVariant, string> = {
  primary: "bg-brand text-brand-foreground hover:opacity-90",
  secondary: "bg-surface text-foreground border border-border hover:bg-border/40",
  outline: "border border-border text-foreground hover:bg-surface",
  ghost: "text-foreground hover:bg-surface",
  destructive: "bg-red-600 text-white hover:bg-red-700",
};

const SIZE_CLASSES: Record<ButtonSize, string> = {
  sm: "h-8 px-3 text-sm",
  md: "h-10 px-4 text-sm",
  lg: "h-12 px-6 text-base",
};

export function buttonVariants(variant: ButtonVariant = "primary", size: ButtonSize = "md", className?: string) {
  return cn(
    "inline-flex items-center justify-center gap-2 rounded-button font-medium transition-colors disabled:pointer-events-none disabled:opacity-50 [&.w-full]:rounded-button-full",
    VARIANT_CLASSES[variant],
    SIZE_CLASSES[size],
    className
  );
}

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  testId: string;
}

export function Button({
  variant = "primary",
  size = "md",
  loading = false,
  disabled,
  className,
  children,
  testId,
  ...rest
}: ButtonProps) {
  return (
    <button
      data-testid={testId}
      className={buttonVariants(variant, size, className)}
      disabled={disabled || loading}
      {...rest}
    >
      {loading && <Loader2 className="size-4 animate-spin" aria-hidden="true" />}
      {children}
    </button>
  );
}

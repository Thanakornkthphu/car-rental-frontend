import { cn } from "@/core/utils/cn.util";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  testId: string;
}

export function Input({ label, error, testId, id, className, ...rest }: InputProps) {
  const inputId = id ?? testId;
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={inputId} className="text-sm font-medium text-foreground">
        {label}
      </label>
      <input
        id={inputId}
        data-testid={testId}
        className={cn(
          "h-10 rounded-card border border-border bg-surface px-3 text-sm text-foreground outline-none focus:border-brand",
          error && "border-red-500",
          className
        )}
        aria-invalid={Boolean(error)}
        {...rest}
      />
      {error && (
        <p className="text-xs text-red-500" data-testid={`${testId}-error`}>
          {error}
        </p>
      )}
    </div>
  );
}

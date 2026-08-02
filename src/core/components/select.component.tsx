import { ChevronDown } from "lucide-react";
import { cn } from "@/core/utils/cn.util";

interface SelectOption {
  label: string;
  value: string;
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  options: SelectOption[];
  testId: string;
  placeholder?: string;
  hideLabel?: boolean;
}

export function Select({ label, options, testId, id, className, placeholder, hideLabel = false, ...rest }: SelectProps) {
  const selectId = id ?? testId;
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={selectId} className={cn("text-sm font-medium text-foreground", hideLabel && "sr-only")}>
        {label}
      </label>
      <div className="relative">
        <select
          id={selectId}
          data-testid={testId}
          className={cn(
            "h-10 w-full appearance-none rounded-card border border-border bg-surface px-3 pr-9 text-sm text-foreground outline-none focus:border-brand",
            className
          )}
          {...rest}
        >
          {placeholder && <option value="">{placeholder}</option>}
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <ChevronDown
          className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
          aria-hidden="true"
        />
      </div>
    </div>
  );
}

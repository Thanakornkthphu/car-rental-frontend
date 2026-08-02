import { cn } from "@/core/utils/cn.util";

type ContainerProps = React.HTMLAttributes<HTMLDivElement>;

export function Container({ className, children, ...rest }: ContainerProps) {
  return (
    <div className={cn("mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8", className)} {...rest}>
      {children}
    </div>
  );
}

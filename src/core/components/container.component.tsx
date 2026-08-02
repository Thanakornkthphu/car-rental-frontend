import { cn } from "@/core/utils/cn.util";

type ContainerSize = "default" | "wide";

const SIZE_CLASSES: Record<ContainerSize, string> = {
  default: "max-w-6xl",
  wide: "max-w-wide",
};

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: ContainerSize;
}

export function Container({ size = "default", className, children, ...rest }: ContainerProps) {
  return (
    <div className={cn("mx-auto w-full px-4 sm:px-6 lg:px-8", SIZE_CLASSES[size], className)} {...rest}>
      {children}
    </div>
  );
}

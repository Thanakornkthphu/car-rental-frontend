import { Card } from "@/core/components/card.component";
import { Skeleton } from "@/core/components/skeleton.component";

export function CarCardSkeleton() {
  return (
    <Card padding="sm" className="flex flex-col gap-4">
      <Skeleton className="h-40 w-full" />
      <div className="flex flex-col gap-2">
        <Skeleton className="h-4 w-2/3" />
        <Skeleton className="h-3 w-1/2" />
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-6 w-1/3" />
      </div>
    </Card>
  );
}

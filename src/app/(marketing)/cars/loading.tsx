import { Container } from "@/core/components/container.component";
import { Skeleton } from "@/core/components/skeleton.component";
import { CarCardSkeleton } from "@/features/cars/car-card-skeleton.component";

export default function CarsLoading() {
  return (
    <Container className="flex flex-col gap-8 py-12">
      <Skeleton className="h-8 w-48" />
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[280px_1fr]">
        <Skeleton className="h-96 w-full" />
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }, (_, index) => (
            <CarCardSkeleton key={index} />
          ))}
        </div>
      </div>
    </Container>
  );
}

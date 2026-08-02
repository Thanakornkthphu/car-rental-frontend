import { Container } from "@/core/components/container.component";
import { Skeleton } from "@/core/components/skeleton.component";

export default function BookingsLoading() {
  return (
    <Container className="flex flex-col gap-6 py-12">
      <Skeleton className="h-8 w-48" />
      <Skeleton className="h-8 w-full max-w-md" />
      <div className="flex flex-col gap-4">
        {Array.from({ length: 4 }, (_, index) => (
          <Skeleton key={index} className="h-20 w-full" />
        ))}
      </div>
    </Container>
  );
}

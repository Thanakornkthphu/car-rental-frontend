import { Container } from "@/core/components/container.component";
import { Skeleton } from "@/core/components/skeleton.component";

export default function BookingDetailLoading() {
  return (
    <Container className="flex max-w-xl flex-col gap-6 py-12">
      <Skeleton className="h-8 w-48" />
      <Skeleton className="h-56 w-full" />
    </Container>
  );
}

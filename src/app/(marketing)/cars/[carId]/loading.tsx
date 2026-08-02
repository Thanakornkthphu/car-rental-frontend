import { Container } from "@/core/components/container.component";
import { Skeleton } from "@/core/components/skeleton.component";

export default function CarDetailLoading() {
  return (
    <Container className="grid grid-cols-1 gap-10 py-12 lg:grid-cols-[1fr_360px]">
      <div className="flex flex-col gap-6">
        <Skeleton className="h-72 w-full" />
        <Skeleton className="h-8 w-1/2" />
        <Skeleton className="h-32 w-full" />
      </div>
      <Skeleton className="h-80 w-full" />
    </Container>
  );
}

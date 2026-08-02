import { notFound } from "next/navigation";
import { CarFront } from "lucide-react";
import { Container } from "@/core/components/container.component";
import { Badge } from "@/core/components/badge.component";
import { CarSpecs } from "@/features/cars/car-specs.component";
import { CarBookingWidget } from "@/features/cars/car-booking-widget.component";
import { getCarById } from "@/features/cars/car.service";
import { getCurrentUser } from "@/features/auth/auth.service";

interface CarDetailPageProps {
  params: Promise<{ carId: string }>;
}

export default async function CarDetailPage({ params }: CarDetailPageProps) {
  const { carId } = await params;
  const car = await getCarById(carId);
  if (!car) notFound();

  const user = await getCurrentUser();

  return (
    <Container className="grid grid-cols-1 gap-10 py-12 lg:grid-cols-[1fr_360px]">
      <div className="flex flex-col gap-6">
        <div className="relative flex h-72 items-center justify-center rounded-card bg-border/40">
          <CarFront className="size-16 text-muted-foreground" aria-hidden="true" />
          {!car.available && (
            <Badge color="neutral" className="absolute right-4 top-4">
              Unavailable
            </Badge>
          )}
        </div>
        <div>
          <h1 className="text-2xl font-semibold text-foreground">
            {car.brand} {car.model} <span className="font-normal text-muted-foreground">({car.year})</span>
          </h1>
          <div className="mt-3">
            <CarSpecs car={car} />
          </div>
        </div>
        <dl className="grid grid-cols-2 gap-4 rounded-card border border-border p-6 text-sm sm:grid-cols-3">
          <div>
            <dt className="text-muted-foreground">Color</dt>
            <dd className="font-medium text-foreground">{car.color}</dd>
          </div>
          <div>
            <dt className="text-muted-foreground">License plate</dt>
            <dd className="font-medium text-foreground">{car.licensePlate}</dd>
          </div>
          <div>
            <dt className="text-muted-foreground">Year</dt>
            <dd className="font-medium text-foreground">{car.year}</dd>
          </div>
        </dl>
      </div>
      <div>
        <CarBookingWidget car={car} isAuthenticated={Boolean(user)} />
      </div>
    </Container>
  );
}

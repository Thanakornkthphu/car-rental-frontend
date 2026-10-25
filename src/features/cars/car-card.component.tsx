import Link from "next/link";
import Image from "next/image";
import { CarFront } from "lucide-react";
import type { Car } from "@/core/types/car.type";
import { Card } from "@/core/components/card.component";
import { Badge } from "@/core/components/badge.component";
import { CarSpecs } from "@/features/cars/car-specs.component";
import { formatCurrencyTHB } from "@/core/utils/format.util";

interface CarCardProps {
  car: Car;
}

export function CarCard({ car }: CarCardProps) {
  return (
    <Link href={`/cars/${car._id}`} data-testid={`car-card-${car._id}-link`} className="group block">
      <Card padding="sm" className="flex h-full flex-col gap-4 transition-colors group-hover:border-brand">
        <div className="relative flex h-40 items-center justify-center overflow-hidden rounded-card bg-border/40">
          {car.image ? (
            <Image src={car.image} alt={`${car.brand} ${car.model}`} fill className="object-cover" />
          ) : (
            <CarFront className="size-12 text-muted-foreground" aria-hidden="true" />
          )}
          {!car.available && (
            <Badge color="neutral" className="absolute right-2 top-2">
              Coming soon
            </Badge>
          )}
        </div>
        <div className="flex flex-1 flex-col gap-2">
          <div>
            <h3 className="font-semibold text-foreground">
              {car.brand} {car.model}
            </h3>
            <p className="text-sm text-muted-foreground">{car.year}</p>
          </div>
          <CarSpecs car={car} />
          <p className="mt-auto text-lg font-semibold text-foreground">
            {formatCurrencyTHB(car.pricePerDay)}
            <span className="text-sm font-normal text-muted-foreground"> / day</span>
          </p>
        </div>
      </Card>
    </Link>
  );
}

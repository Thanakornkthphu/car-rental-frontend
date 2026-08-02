import { Cog, Fuel, Users } from "lucide-react";
import type { Car } from "@/core/types/car.type";

const FUEL_LABELS: Record<Car["fuelType"], string> = {
  petrol: "Petrol",
  diesel: "Diesel",
  hybrid: "Hybrid",
  ev: "Electric",
};

const TRANSMISSION_LABELS: Record<Car["transmission"], string> = {
  auto: "Automatic",
  manual: "Manual",
};

interface CarSpecsProps {
  car: Car;
}

export function CarSpecs({ car }: CarSpecsProps) {
  return (
    <dl className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted-foreground">
      <div className="flex items-center gap-1.5">
        <Users className="size-4" aria-hidden="true" />
        <dd>{car.seats} seats</dd>
      </div>
      <div className="flex items-center gap-1.5">
        <Cog className="size-4" aria-hidden="true" />
        <dd>{TRANSMISSION_LABELS[car.transmission]}</dd>
      </div>
      <div className="flex items-center gap-1.5">
        <Fuel className="size-4" aria-hidden="true" />
        <dd>{FUEL_LABELS[car.fuelType]}</dd>
      </div>
    </dl>
  );
}

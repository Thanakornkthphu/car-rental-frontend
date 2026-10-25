"use client";

import { CarCardSkeleton } from "@/features/cars/car-card-skeleton.component";
import { CarGrid } from "@/features/cars/car-grid.component";
import { useCars } from "@/features/cars/use-cars.hook";

export function FeaturedCarGrid() {
  const { data, isPending, isError } = useCars();

  if (isPending) return <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">{Array.from({ length: 6 }, (_, index) => <CarCardSkeleton key={index} />)}</div>;
  if (isError || !data) return <p className="text-sm text-red-500">Unable to load popular cars.</p>;

  return <CarGrid cars={data.filter((car) => car.available).toSorted((a, b) => a.pricePerDay - b.pricePerDay).slice(0, 6)} />;
}

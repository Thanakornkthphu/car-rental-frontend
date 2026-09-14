"use client";

import { useQuery } from "@tanstack/react-query";
import type { Car, CarSearchParams } from "@/core/types/car.type";
import { CarCardSkeleton } from "@/features/cars/car-card-skeleton.component";
import { CarGrid } from "@/features/cars/car-grid.component";
import { filterCars, type ApiCar, toCar } from "@/features/cars/car.util";

interface CarQueryGridProps {
  filters: CarSearchParams;
}

async function fetchCars(): Promise<Car[]> {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/cars`);
  if (!response.ok) throw new Error("Unable to load cars.");
  return (await response.json() as ApiCar[]).map(toCar);
}

export function CarQueryGrid({ filters }: CarQueryGridProps) {
  const { data, isPending, isError } = useQuery({ queryKey: ["cars"], queryFn: fetchCars });

  if (isPending) {
    return <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">{Array.from({ length: 6 }, (_, index) => <CarCardSkeleton key={index} />)}</div>;
  }

  if (isError || !data) return <p className="text-sm text-red-500">Unable to load cars.</p>;

  return <CarGrid cars={filterCars(data, filters)} />;
}

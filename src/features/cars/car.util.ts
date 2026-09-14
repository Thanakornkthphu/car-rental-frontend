import type { Car, CarSearchParams } from "@/core/types/car.type";

export interface ApiCar {
  _id: string;
  brand: string;
  model: string;
  year: number;
  licensePlate?: string;
  pricePerDay: number;
  color?: string;
  seats?: number;
  transmission?: Car["transmission"];
  fuelType?: Car["fuelType"];
  image?: string;
  status?: "available" | "coming_soon";
  createdAt?: string;
  updatedAt?: string;
}

export function toCar(car: ApiCar): Car {
  return {
    _id: car._id,
    brand: car.brand,
    model: car.model,
    year: car.year,
    licensePlate: car.licensePlate ?? "",
    pricePerDay: car.pricePerDay,
    color: car.color ?? "",
    seats: car.seats ?? 4,
    transmission: car.transmission ?? "auto",
    fuelType: car.fuelType ?? "petrol",
    image: car.image ?? null,
    available: car.status !== "coming_soon",
    createdAt: car.createdAt ?? "",
    updatedAt: car.updatedAt ?? "",
  };
}

export function filterCars(cars: Car[], filters: CarSearchParams): Car[] {
  const filtered = cars.filter((car) => {
    if (filters.brand && car.brand !== filters.brand) return false;
    if (filters.transmission && car.transmission !== filters.transmission) return false;
    if (filters.fuelType && car.fuelType !== filters.fuelType) return false;
    if (filters.seats && car.seats < filters.seats) return false;
    if (filters.minPrice && car.pricePerDay < filters.minPrice) return false;
    if (filters.maxPrice && car.pricePerDay > filters.maxPrice) return false;
    return true;
  });

  if (filters.sort === "price-asc") return filtered.toSorted((a, b) => a.pricePerDay - b.pricePerDay);
  if (filters.sort === "price-desc") return filtered.toSorted((a, b) => b.pricePerDay - a.pricePerDay);
  return filtered;
}

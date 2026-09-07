import { apiFetch } from "@/core/services/api.service";
import type { Car, CarFormInput, CarSearchParams } from "@/core/types/car.type";

interface ApiCar {
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

function toCar(car: ApiCar): Car {
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

function matchesFilters(car: Car, filters: CarSearchParams): boolean {
  if (filters.brand && car.brand !== filters.brand) return false;
  if (filters.transmission && car.transmission !== filters.transmission) return false;
  if (filters.fuelType && car.fuelType !== filters.fuelType) return false;
  if (filters.seats && car.seats < filters.seats) return false;
  if (filters.minPrice && car.pricePerDay < filters.minPrice) return false;
  if (filters.maxPrice && car.pricePerDay > filters.maxPrice) return false;
  return true;
}

function toApiInput(input: CarFormInput) {
  return { ...input, status: input.available ? "available" : "coming_soon" };
}

export async function getCars(filters: CarSearchParams = {}): Promise<Car[]> {
  const cars = (await apiFetch<ApiCar[]>("/cars")).map(toCar).filter((car) => matchesFilters(car, filters));
  if (filters.sort === "price-asc") return cars.toSorted((a, b) => a.pricePerDay - b.pricePerDay);
  if (filters.sort === "price-desc") return cars.toSorted((a, b) => b.pricePerDay - a.pricePerDay);
  return cars;
}

export async function getCarById(id: string): Promise<Car | null> {
  try {
    return toCar(await apiFetch<ApiCar>(`/cars/${id}`));
  } catch {
    return null;
  }
}

export async function getCarBrands(): Promise<string[]> {
  return [...new Set((await getCars()).map((car) => car.brand))].sort();
}

export async function createCar(input: CarFormInput): Promise<Car> {
  return toCar(await apiFetch<ApiCar>("/cars", { method: "POST", body: JSON.stringify(toApiInput(input)) }));
}

export async function updateCar(id: string, input: CarFormInput): Promise<Car> {
  return toCar(await apiFetch<ApiCar>(`/cars/${id}`, { method: "PATCH", body: JSON.stringify(toApiInput(input)) }));
}

export async function deleteCar(id: string): Promise<void> {
  await apiFetch(`/cars/${id}`, { method: "DELETE" });
}

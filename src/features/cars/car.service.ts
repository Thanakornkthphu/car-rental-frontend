import type { Car, CarFormInput, CarSearchParams } from "@/core/types/car.type";
import { MOCK_CARS } from "@/features/cars/car.mock";

function matchesFilters(car: Car, filters: CarSearchParams): boolean {
  if (filters.brand && car.brand !== filters.brand) return false;
  if (filters.transmission && car.transmission !== filters.transmission) return false;
  if (filters.fuelType && car.fuelType !== filters.fuelType) return false;
  if (filters.seats && car.seats < filters.seats) return false;
  if (filters.minPrice && car.pricePerDay < filters.minPrice) return false;
  if (filters.maxPrice && car.pricePerDay > filters.maxPrice) return false;
  return true;
}

export async function getCars(filters: CarSearchParams = {}): Promise<Car[]> {
  const filtered = MOCK_CARS.filter((car) => matchesFilters(car, filters));
  if (filters.sort === "price-asc") return filtered.toSorted((a, b) => a.pricePerDay - b.pricePerDay);
  if (filters.sort === "price-desc") return filtered.toSorted((a, b) => b.pricePerDay - a.pricePerDay);
  return filtered;
}

export async function getCarById(id: string): Promise<Car | null> {
  return MOCK_CARS.find((car) => car._id === id) ?? null;
}

export async function getCarBrands(): Promise<string[]> {
  return [...new Set(MOCK_CARS.map((car) => car.brand))].sort();
}

export async function createCar(input: CarFormInput): Promise<Car> {
  const now = new Date().toISOString();
  const car: Car = { _id: crypto.randomUUID(), createdAt: now, updatedAt: now, ...input, image: input.image ?? null };
  MOCK_CARS.unshift(car);
  return car;
}

export async function updateCar(id: string, input: CarFormInput): Promise<Car> {
  const index = MOCK_CARS.findIndex((car) => car._id === id);
  if (index === -1) throw new Error("Car not found");
  const updated: Car = { ...MOCK_CARS[index], ...input, updatedAt: new Date().toISOString() };
  MOCK_CARS[index] = updated;
  return updated;
}

export async function deleteCar(id: string): Promise<void> {
  const index = MOCK_CARS.findIndex((car) => car._id === id);
  if (index === -1) throw new Error("Car not found");
  MOCK_CARS.splice(index, 1);
}

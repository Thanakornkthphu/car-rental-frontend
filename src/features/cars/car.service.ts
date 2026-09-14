import { apiFetch } from "@/core/services/api.service";
import type { Car, CarFormInput, CarSearchParams } from "@/core/types/car.type";
import { filterCars, type ApiCar, toCar } from "@/features/cars/car.util";

function toApiInput(input: CarFormInput) {
  return { ...input, status: input.available ? "available" : "coming_soon" };
}

export async function getCars(filters: CarSearchParams = {}): Promise<Car[]> {
  return filterCars((await apiFetch<ApiCar[]>("/cars")).map(toCar), filters);
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

"use client";

import { useQuery } from "@tanstack/react-query";
import { browserApiClient } from "@/core/services/browser-api-client.service";
import type { Car } from "@/core/types/car.type";
import { type ApiCar, toCar } from "@/features/cars/car.util";

export const carsQueryKey = ["cars"] as const;

async function fetchCars(): Promise<Car[]> {
  const { data } = await browserApiClient.get<ApiCar[]>("/cars");
  return data.map(toCar);
}

export function useCars() {
  return useQuery({ queryKey: carsQueryKey, queryFn: fetchCars });
}

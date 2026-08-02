"use server";

import { revalidatePath } from "next/cache";
import type { CarFormInput } from "@/core/types/car.type";
import { MIN_CAR_SEATS } from "@/features/cars/car.constant";
import { createCar, deleteCar, updateCar } from "@/features/cars/car.service";

type ActionResult = { success: true } | { success: false; error: string };

function validateCarInput(input: CarFormInput): string | null {
  if (!input.brand.trim() || !input.model.trim() || !input.licensePlate.trim() || !input.color.trim()) {
    return "Please fill in every field.";
  }
  if (input.year < 1990 || input.year > new Date().getFullYear() + 1) {
    return "Please enter a valid year.";
  }
  if (input.pricePerDay <= 0) return "Price per day must be greater than 0.";
  if (input.seats < MIN_CAR_SEATS) return `Cars need at least ${MIN_CAR_SEATS} seats.`;
  return null;
}

function revalidateCarPaths() {
  revalidatePath("/");
  revalidatePath("/cars");
  revalidatePath("/admin/cars");
}

export async function createCarAction(input: CarFormInput): Promise<ActionResult> {
  const error = validateCarInput(input);
  if (error) return { success: false, error };
  await createCar(input);
  revalidateCarPaths();
  return { success: true };
}

export async function updateCarAction(id: string, input: CarFormInput): Promise<ActionResult> {
  const error = validateCarInput(input);
  if (error) return { success: false, error };
  await updateCar(id, input);
  revalidateCarPaths();
  return { success: true };
}

export async function deleteCarAction(id: string): Promise<ActionResult> {
  await deleteCar(id);
  revalidateCarPaths();
  return { success: true };
}

export type Transmission = "auto" | "manual";

export type FuelType = "petrol" | "diesel" | "hybrid" | "ev";

export interface Car {
  _id: string;
  brand: string;
  model: string;
  year: number;
  licensePlate: string;
  pricePerDay: number;
  color: string;
  seats: number;
  transmission: Transmission;
  fuelType: FuelType;
  image: string | null;
  available: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CarSearchParams {
  brand?: string;
  transmission?: Transmission;
  fuelType?: FuelType;
  minPrice?: number;
  maxPrice?: number;
  seats?: number;
  page?: number;
  sort?: "price-asc" | "price-desc";
}

export interface CarFormInput {
  brand: string;
  model: string;
  year: number;
  licensePlate: string;
  pricePerDay: number;
  color: string;
  seats: number;
  transmission: Transmission;
  fuelType: FuelType;
  image?: string | null;
  available: boolean;
}

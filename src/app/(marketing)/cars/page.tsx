import type { CarSearchParams, Transmission, FuelType } from "@/core/types/car.type";
import { Container } from "@/core/components/container.component";
import { CarFilters } from "@/features/cars/car-filters.component";
import { CarQueryGrid } from "@/features/cars/car-query-grid.component";

interface CarsPageProps {
  searchParams: Promise<{
    brand?: string;
    transmission?: string;
    fuelType?: string;
    minPrice?: string;
    maxPrice?: string;
    sort?: string;
  }>;
}

export default async function CarsPage({ searchParams }: CarsPageProps) {
  const params = await searchParams;
  const filters: CarSearchParams = {
    brand: params.brand || undefined,
    transmission: (params.transmission as Transmission) || undefined,
    fuelType: (params.fuelType as FuelType) || undefined,
    minPrice: params.minPrice ? Number(params.minPrice) : undefined,
    maxPrice: params.maxPrice ? Number(params.maxPrice) : undefined,
    sort: params.sort === "price-asc" || params.sort === "price-desc" ? params.sort : undefined,
  };

  return (
    <Container className="flex flex-col gap-8 py-12">
      <h1 className="text-2xl font-semibold text-foreground">Browse Cars</h1>
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[280px_1fr]">
        <CarFilters filters={filters} />
        <CarQueryGrid filters={filters} />
      </div>
    </Container>
  );
}

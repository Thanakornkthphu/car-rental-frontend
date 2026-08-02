import Link from "next/link";
import type { CarSearchParams } from "@/core/types/car.type";
import { CAR_SORT_OPTIONS, FUEL_TYPE_OPTIONS, TRANSMISSION_OPTIONS } from "@/features/cars/car.constant";
import { getCarBrands } from "@/features/cars/car.service";
import { Select } from "@/core/components/select.component";
import { Input } from "@/core/components/input.component";
import { Button } from "@/core/components/button.component";
import { Card } from "@/core/components/card.component";

interface CarFiltersProps {
  filters: CarSearchParams;
}

export async function CarFilters({ filters }: CarFiltersProps) {
  const brands = await getCarBrands();
  const brandOptions = brands.map((brand) => ({ label: brand, value: brand }));

  return (
    <Card padding="md">
      <form method="get" data-testid="car-filters-form" className="flex flex-col gap-4">
        <Select
          label="Brand"
          name="brand"
          testId="car-filter-brand-select"
          options={brandOptions}
          placeholder="All brands"
          defaultValue={filters.brand ?? ""}
        />
        <Select
          label="Transmission"
          name="transmission"
          testId="car-filter-transmission-select"
          options={TRANSMISSION_OPTIONS}
          placeholder="Any"
          defaultValue={filters.transmission ?? ""}
        />
        <Select
          label="Fuel type"
          name="fuelType"
          testId="car-filter-fuel-type-select"
          options={FUEL_TYPE_OPTIONS}
          placeholder="Any"
          defaultValue={filters.fuelType ?? ""}
        />
        <div className="grid grid-cols-2 gap-3">
          <Input
            label="Min price/day"
            name="minPrice"
            type="number"
            min={0}
            testId="car-filter-min-price-input"
            defaultValue={filters.minPrice ?? ""}
          />
          <Input
            label="Max price/day"
            name="maxPrice"
            type="number"
            min={0}
            testId="car-filter-max-price-input"
            defaultValue={filters.maxPrice ?? ""}
          />
        </div>
        <Select
          label="Sort by"
          name="sort"
          testId="car-filter-sort-select"
          options={CAR_SORT_OPTIONS}
          placeholder="Newest"
          defaultValue={filters.sort ?? ""}
        />
        <div className="flex gap-2">
          <Button testId="car-filter-apply-button" type="submit" className="flex-1">
            Apply Filters
          </Button>
          <Link
            href="/cars"
            data-testid="car-filter-clear-link"
            className="flex h-10 items-center justify-center rounded-card border border-border px-4 text-sm font-medium text-foreground hover:bg-background"
          >
            Clear
          </Link>
        </div>
      </form>
    </Card>
  );
}

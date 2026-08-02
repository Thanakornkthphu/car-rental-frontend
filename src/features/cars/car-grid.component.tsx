import type { Car } from "@/core/types/car.type";
import { CarCard } from "@/features/cars/car-card.component";
import { EmptyState } from "@/core/components/empty-state.component";

interface CarGridProps {
  cars: Car[];
}

export function CarGrid({ cars }: CarGridProps) {
  if (cars.length === 0) {
    return (
      <EmptyState
        title="No cars match your filters"
        description="Try widening your search or clearing filters."
        actionHref="/cars"
        actionLabel="Clear filters"
        testId="car-grid-empty-state"
      />
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {cars.map((car) => (
        <CarCard key={car._id} car={car} />
      ))}
    </div>
  );
}

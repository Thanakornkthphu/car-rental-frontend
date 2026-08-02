import { CarFront } from "lucide-react";
import type { Car } from "@/core/types/car.type";
import { Card } from "@/core/components/card.component";
import { countRentalDays, formatCurrencyTHB, formatDate } from "@/core/utils/format.util";

interface BookingSummaryProps {
  car: Car;
  startDate: string;
  endDate: string;
  totalPrice: number;
}

export function BookingSummary({ car, startDate, endDate, totalPrice }: BookingSummaryProps) {
  const nights = countRentalDays(startDate, endDate);

  return (
    <Card padding="md" className="flex flex-col gap-4">
      <div className="flex items-center gap-3">
        <div className="flex size-14 items-center justify-center rounded-card bg-border/40">
          <CarFront className="size-6 text-muted-foreground" aria-hidden="true" />
        </div>
        <div>
          <p className="font-semibold text-foreground">
            {car.brand} {car.model}
          </p>
          <p className="text-sm text-muted-foreground">{car.year}</p>
        </div>
      </div>
      <dl className="flex flex-col gap-2 border-t border-border pt-4 text-sm">
        <div className="flex justify-between">
          <dt className="text-muted-foreground">Pick-up</dt>
          <dd className="text-foreground">{formatDate(startDate)}</dd>
        </div>
        <div className="flex justify-between">
          <dt className="text-muted-foreground">Return</dt>
          <dd className="text-foreground">{formatDate(endDate)}</dd>
        </div>
        <div className="flex justify-between">
          <dt className="text-muted-foreground">
            {formatCurrencyTHB(car.pricePerDay)} &times; {nights} {nights === 1 ? "day" : "days"}
          </dt>
          <dd className="text-foreground">{formatCurrencyTHB(totalPrice)}</dd>
        </div>
        <div className="flex justify-between border-t border-border pt-2 font-semibold text-foreground">
          <dt>Total</dt>
          <dd>{formatCurrencyTHB(totalPrice)}</dd>
        </div>
      </dl>
    </Card>
  );
}

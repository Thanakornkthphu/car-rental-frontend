"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import type { Car } from "@/core/types/car.type";
import { Card } from "@/core/components/card.component";
import { Input } from "@/core/components/input.component";
import { Button } from "@/core/components/button.component";
import { calculateTotalPrice, countRentalDays, formatCurrencyTHB } from "@/core/utils/format.util";
import { isValidDateRange } from "@/core/utils/validation.util";

interface CarBookingWidgetProps {
  car: Car;
  isAuthenticated: boolean;
}

function today(): string {
  return new Date().toISOString().slice(0, 10);
}

export function CarBookingWidget({ car, isAuthenticated }: CarBookingWidgetProps) {
  const router = useRouter();
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const isValid = useMemo(() => isValidDateRange(startDate, endDate), [startDate, endDate]);
  const nights = isValid ? countRentalDays(startDate, endDate) : 0;
  const total = isValid ? calculateTotalPrice(car.pricePerDay, startDate, endDate) : 0;

  function handleBookNow() {
    if (!isAuthenticated) {
      router.push(`/login?redirect=/cars/${car._id}`);
      return;
    }
    router.push(`/bookings/new?carId=${car._id}&start=${startDate}&end=${endDate}`);
  }

  return (
    <Card padding="md" className="flex flex-col gap-4">
      <p className="text-lg font-semibold text-foreground">
        {formatCurrencyTHB(car.pricePerDay)}
        <span className="text-sm font-normal text-muted-foreground"> / day</span>
      </p>
      <div className="grid grid-cols-2 gap-3">
        <Input
          label="Pick-up"
          type="date"
          testId="car-booking-start-date-input"
          min={today()}
          value={startDate}
          onChange={(event) => setStartDate(event.target.value)}
        />
        <Input
          label="Return"
          type="date"
          testId="car-booking-end-date-input"
          min={startDate || today()}
          value={endDate}
          onChange={(event) => setEndDate(event.target.value)}
        />
      </div>
      {startDate && endDate && !isValid && (
        <p className="text-sm text-red-500" data-testid="car-booking-date-error">
          Return date must be after the pick-up date.
        </p>
      )}
      {isValid && (
        <p className="text-sm text-muted-foreground" data-testid="car-booking-total-preview">
          {nights} {nights === 1 ? "day" : "days"} &middot; Total {formatCurrencyTHB(total)}
        </p>
      )}
      <Button
        testId="car-booking-book-now-button"
        disabled={!isValid || !car.available}
        onClick={handleBookNow}
        className="w-full"
      >
        {car.available ? "Book Now" : "Unavailable"}
      </Button>
    </Card>
  );
}

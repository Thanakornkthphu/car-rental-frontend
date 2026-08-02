import Link from "next/link";
import { CarFront } from "lucide-react";
import type { Booking } from "@/core/types/booking.type";
import type { Car } from "@/core/types/car.type";
import { Card } from "@/core/components/card.component";
import { StatusPill } from "@/features/bookings/status-pill.component";
import { formatCurrencyTHB, formatDate } from "@/core/utils/format.util";

interface BookingListItemProps {
  booking: Booking;
  car: Car;
}

export function BookingListItem({ booking, car }: BookingListItemProps) {
  return (
    <Link href={`/bookings/${booking._id}`} data-testid={`booking-list-item-${booking._id}-link`} className="block">
      <Card padding="sm" className="flex items-center gap-4 transition-colors hover:border-brand">
        <div className="flex size-12 shrink-0 items-center justify-center rounded-card bg-border/40">
          <CarFront className="size-5 text-muted-foreground" aria-hidden="true" />
        </div>
        <div className="flex-1">
          <p className="font-medium text-foreground">
            {car.brand} {car.model}
          </p>
          <p className="text-sm text-muted-foreground">
            {formatDate(booking.startDate)} &ndash; {formatDate(booking.endDate)}
          </p>
        </div>
        <div className="flex flex-col items-end gap-1">
          <StatusPill status={booking.status} />
          <p className="text-sm font-semibold text-foreground">{formatCurrencyTHB(booking.totalPrice)}</p>
        </div>
      </Card>
    </Link>
  );
}

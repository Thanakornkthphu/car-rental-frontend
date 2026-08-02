import Link from "next/link";
import { notFound } from "next/navigation";
import { CheckCircle2 } from "lucide-react";
import { Container } from "@/core/components/container.component";
import { buttonVariants } from "@/core/components/button.component";
import { BookingSummary } from "@/features/bookings/booking-summary.component";
import { getBookingById } from "@/features/bookings/booking.service";
import { getCarById } from "@/features/cars/car.service";

interface ConfirmationPageProps {
  params: Promise<{ bookingId: string }>;
}

export default async function BookingConfirmationPage({ params }: ConfirmationPageProps) {
  const { bookingId } = await params;
  const booking = await getBookingById(bookingId);
  if (!booking) notFound();

  const car = await getCarById(booking.car);
  if (!car) notFound();

  return (
    <Container className="flex max-w-xl flex-col items-center gap-6 py-16 text-center">
      <CheckCircle2 className="size-12 text-emerald-500" aria-hidden="true" />
      <div>
        <h1 className="text-2xl font-semibold text-foreground">Booking confirmed</h1>
        <p className="text-sm text-muted-foreground">A confirmation has been added to your bookings.</p>
      </div>

      <BookingSummary car={car} startDate={booking.startDate} endDate={booking.endDate} totalPrice={booking.totalPrice} />

      <div className="flex gap-3">
        <Link href="/bookings" data-testid="confirmation-view-bookings-link" className={buttonVariants("primary", "md")}>
          View My Bookings
        </Link>
        <Link href="/cars" data-testid="confirmation-book-another-link" className={buttonVariants("outline", "md")}>
          Book Another Car
        </Link>
      </div>
    </Container>
  );
}

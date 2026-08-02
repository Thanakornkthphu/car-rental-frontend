import { notFound, redirect } from "next/navigation";
import { CreditCard } from "lucide-react";
import { Container } from "@/core/components/container.component";
import { Card } from "@/core/components/card.component";
import { StatusPill } from "@/features/bookings/status-pill.component";
import { BookingSummary } from "@/features/bookings/booking-summary.component";
import { CancelBookingButton } from "@/features/bookings/cancel-booking-button.component";
import { getBookingById } from "@/features/bookings/booking.service";
import { getPaymentByBooking } from "@/features/bookings/payment.service";
import { getCarById } from "@/features/cars/car.service";
import { getCurrentUser } from "@/features/auth/auth.service";

interface BookingDetailPageProps {
  params: Promise<{ bookingId: string }>;
}

export default async function BookingDetailPage({ params }: BookingDetailPageProps) {
  const { bookingId } = await params;
  const booking = await getBookingById(bookingId);
  if (!booking) notFound();

  const user = await getCurrentUser();
  if (!user || (booking.userId !== user._id && !user.isAdmin)) redirect("/bookings");

  const car = await getCarById(booking.car);
  if (!car) notFound();

  const payment = await getPaymentByBooking(booking._id);
  const canCancel = booking.status === "pending" || booking.status === "confirmed";

  return (
    <Container className="flex max-w-xl flex-col gap-6 py-12">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-foreground">Booking Details</h1>
        <StatusPill status={booking.status} />
      </div>

      <BookingSummary car={car} startDate={booking.startDate} endDate={booking.endDate} totalPrice={booking.totalPrice} />

      {payment && (
        <Card padding="md" className="flex items-center gap-3">
          <CreditCard className="size-5 text-muted-foreground" aria-hidden="true" />
          <div className="text-sm">
            <p className="font-medium text-foreground">Paid with card ending in {payment.last4}</p>
            <p className="text-muted-foreground">{payment.cardHolder}</p>
          </div>
        </Card>
      )}

      {canCancel && (
        <div className="flex justify-end">
          <CancelBookingButton bookingId={booking._id} />
        </div>
      )}
    </Container>
  );
}

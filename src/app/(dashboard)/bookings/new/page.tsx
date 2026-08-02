import { redirect } from "next/navigation";
import { Container } from "@/core/components/container.component";
import { BookingSummary } from "@/features/bookings/booking-summary.component";
import { BookingForm } from "@/features/bookings/booking-form.component";
import { getCarById } from "@/features/cars/car.service";
import { calculateTotalPrice } from "@/core/utils/format.util";
import { isValidDateRange } from "@/core/utils/validation.util";

interface NewBookingPageProps {
  searchParams: Promise<{ carId?: string; start?: string; end?: string }>;
}

export default async function NewBookingPage({ searchParams }: NewBookingPageProps) {
  const { carId, start, end } = await searchParams;
  if (!carId) redirect("/cars");

  const car = await getCarById(carId);
  if (!car) redirect("/cars");
  if (!start || !end || !isValidDateRange(start, end)) redirect(`/cars/${carId}`);

  const totalPrice = calculateTotalPrice(car.pricePerDay, start, end);

  return (
    <Container className="grid grid-cols-1 gap-8 py-12 lg:grid-cols-2">
      <div>
        <h1 className="mb-6 text-2xl font-semibold text-foreground">Confirm &amp; Pay</h1>
        <BookingSummary car={car} startDate={start} endDate={end} totalPrice={totalPrice} />
      </div>
      <BookingForm carId={car._id} startDate={start} endDate={end} />
    </Container>
  );
}

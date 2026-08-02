import Link from "next/link";
import { buttonVariants } from "@/core/components/button.component";
import { Container } from "@/core/components/container.component";

export default function BookingNotFound() {
  return (
    <Container className="flex flex-col items-center gap-4 py-24 text-center">
      <h1 className="text-2xl font-semibold text-foreground">Booking not found</h1>
      <Link href="/bookings" data-testid="booking-not-found-back-link" className={buttonVariants("primary", "md")}>
        Back to My Bookings
      </Link>
    </Container>
  );
}

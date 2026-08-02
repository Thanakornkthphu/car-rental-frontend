import { redirect } from "next/navigation";
import { Container } from "@/core/components/container.component";
import { AdminBookingTable } from "@/features/bookings/admin-booking-table.component";
import { getBookings } from "@/features/bookings/booking.service";
import { getCarById } from "@/features/cars/car.service";
import { getCurrentUser, getUserById } from "@/features/auth/auth.service";

export default async function AdminBookingsPage() {
  const currentUser = await getCurrentUser();
  if (!currentUser?.isAdmin) redirect("/bookings");

  const { data: bookings } = await getBookings({ limit: 50 });
  const rows = await Promise.all(
    bookings.map(async (booking) => {
      const car = await getCarById(booking.car);
      const user = await getUserById(booking.userId);
      return car && user ? { booking, car, user } : null;
    })
  );

  return (
    <Container className="flex flex-col gap-6 py-12">
      <h1 className="text-2xl font-semibold text-foreground">Manage Bookings</h1>
      <AdminBookingTable rows={rows.filter((row) => row !== null)} />
    </Container>
  );
}

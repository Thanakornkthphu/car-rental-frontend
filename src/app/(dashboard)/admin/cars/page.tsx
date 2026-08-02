import { redirect } from "next/navigation";
import { Container } from "@/core/components/container.component";
import { AdminCarTable } from "@/features/cars/admin-car-table.component";
import { getCars } from "@/features/cars/car.service";
import { getCurrentUser } from "@/features/auth/auth.service";

export default async function AdminCarsPage() {
  const user = await getCurrentUser();
  if (!user?.isAdmin) redirect("/bookings");

  const cars = await getCars();

  return (
    <Container className="flex flex-col gap-6 py-12">
      <h1 className="text-2xl font-semibold text-foreground">Manage Cars</h1>
      <AdminCarTable cars={cars} />
    </Container>
  );
}

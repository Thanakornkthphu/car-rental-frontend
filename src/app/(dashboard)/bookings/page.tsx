import Link from "next/link";
import type { BookingStatus } from "@/core/types/booking.type";
import { Container } from "@/core/components/container.component";
import { Pagination } from "@/core/components/pagination.component";
import { EmptyState } from "@/core/components/empty-state.component";
import { BookingListItem } from "@/features/bookings/booking-list-item.component";
import { getBookings } from "@/features/bookings/booking.service";
import { getCarById } from "@/features/cars/car.service";
import { getCurrentUser } from "@/features/auth/auth.service";
import { cn } from "@/core/utils/cn.util";

const STATUS_TABS: { label: string; value: BookingStatus | undefined }[] = [
  { label: "All", value: undefined },
  { label: "Pending", value: "pending" },
  { label: "Confirmed", value: "confirmed" },
  { label: "Completed", value: "completed" },
  { label: "Cancelled", value: "cancelled" },
];

interface MyBookingsPageProps {
  searchParams: Promise<{ status?: string; page?: string }>;
}

export default async function MyBookingsPage({ searchParams }: MyBookingsPageProps) {
  const params = await searchParams;
  const status = params.status as BookingStatus | undefined;
  const page = params.page ? Number(params.page) : 1;

  const user = await getCurrentUser();
  const { data: bookings, totalPages } = await getBookings({ userId: user?._id, status, page });
  const cars = await Promise.all(bookings.map((booking) => getCarById(booking.car)));

  return (
    <Container className="flex flex-col gap-6 py-12">
      <h1 className="text-2xl font-semibold text-foreground">My Bookings</h1>

      <div className="flex flex-wrap gap-2" data-testid="booking-status-tabs">
        {STATUS_TABS.map((tab) => (
          <Link
            key={tab.label}
            href={tab.value ? `/bookings?status=${tab.value}` : "/bookings"}
            data-testid={`booking-status-tab-${tab.value ?? "all"}-link`}
            className={cn(
              "rounded-button px-3 py-1.5 text-sm font-medium",
              status === tab.value ? "bg-brand text-brand-foreground" : "border border-border text-foreground hover:bg-surface"
            )}
          >
            {tab.label}
          </Link>
        ))}
      </div>

      {bookings.length === 0 ? (
        <EmptyState
          title="No bookings yet"
          description="Browse the fleet to make your first booking."
          actionHref="/cars"
          actionLabel="Browse Cars"
          testId="my-bookings-empty-state"
        />
      ) : (
        <div className="flex flex-col gap-4">
          {bookings.map((booking, index) => {
            const car = cars[index];
            if (!car) return null;
            return <BookingListItem key={booking._id} booking={booking} car={car} />;
          })}
        </div>
      )}

      <Pagination page={page} totalPages={totalPages} basePath="/bookings" searchParams={{ status }} testId="my-bookings-pagination" />
    </Container>
  );
}

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react";
import type { Booking, BookingStatus } from "@/core/types/booking.type";
import type { Car } from "@/core/types/car.type";
import type { User } from "@/core/types/user.type";
import { formatCurrencyTHB, formatDate } from "@/core/utils/format.util";
import { deleteBookingAction, updateBookingStatusAction } from "@/features/bookings/booking.action";
import { Select } from "@/core/components/select.component";
import { Button } from "@/core/components/button.component";
import { ConfirmDialog } from "@/core/components/confirm-dialog.component";
import { EmptyState } from "@/core/components/empty-state.component";

const STATUS_OPTIONS = [
  { label: "Pending", value: "pending" },
  { label: "Confirmed", value: "confirmed" },
  { label: "Completed", value: "completed" },
  { label: "Cancelled", value: "cancelled" },
];

interface AdminBookingRow {
  booking: Booking;
  car: Car;
  user: User;
}

interface AdminBookingTableProps {
  rows: AdminBookingRow[];
}

export function AdminBookingTable({ rows }: AdminBookingTableProps) {
  const router = useRouter();
  const [deleteTarget, setDeleteTarget] = useState<Booking | null>(null);
  const [deleting, setDeleting] = useState(false);

  async function handleStatusChange(bookingId: string, status: BookingStatus) {
    await updateBookingStatusAction(bookingId, status);
    router.refresh();
  }

  async function handleDelete() {
    if (!deleteTarget) return;
    setDeleting(true);
    await deleteBookingAction(deleteTarget._id);
    setDeleting(false);
    setDeleteTarget(null);
    router.refresh();
  }

  if (rows.length === 0) {
    return <EmptyState title="No bookings yet" testId="admin-bookings-empty-state" />;
  }

  return (
    <div className="overflow-x-auto rounded-card border border-border">
      <table className="w-full min-w-[820px] text-left text-sm" data-testid="admin-bookings-table">
        <thead className="border-b border-border bg-surface text-muted-foreground">
          <tr>
            <th className="p-3 font-medium">Customer</th>
            <th className="p-3 font-medium">Car</th>
            <th className="p-3 font-medium">Dates</th>
            <th className="p-3 font-medium">Total</th>
            <th className="p-3 font-medium">Status</th>
            <th className="p-3 font-medium">Actions</th>
          </tr>
        </thead>
        <tbody>
          {rows.map(({ booking, car, user }) => (
            <tr key={booking._id} data-testid={`admin-booking-row-${booking._id}`} className="border-b border-border last:border-0">
              <td className="p-3">
                <p className="font-medium text-foreground">{user.name}</p>
                <p className="text-xs text-muted-foreground">{user.email}</p>
              </td>
              <td className="p-3">
                {car.brand} {car.model}
              </td>
              <td className="p-3 text-muted-foreground">
                {formatDate(booking.startDate)} &ndash; {formatDate(booking.endDate)}
              </td>
              <td className="p-3">{formatCurrencyTHB(booking.totalPrice)}</td>
              <td className="p-3">
                <Select
                  label={`Status for booking ${booking._id}`}
                  hideLabel
                  testId={`admin-booking-${booking._id}-status-select`}
                  options={STATUS_OPTIONS}
                  defaultValue={booking.status}
                  onChange={(event) => handleStatusChange(booking._id, event.target.value as BookingStatus)}
                  className="h-9"
                />
              </td>
              <td className="p-3">
                <Button
                  testId={`admin-booking-${booking._id}-delete-button`}
                  variant="ghost"
                  size="sm"
                  onClick={() => setDeleteTarget(booking)}
                >
                  <Trash2 className="size-4 text-red-500" aria-hidden="true" />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <ConfirmDialog
        open={deleteTarget !== null}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
        title="Delete booking"
        message="Delete this booking permanently? This cannot be undone."
        confirmLabel="Delete"
        destructive
        loading={deleting}
        testId="delete-booking-confirm-dialog"
      />
    </div>
  );
}

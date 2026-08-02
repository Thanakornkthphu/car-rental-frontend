"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/core/components/button.component";
import { ConfirmDialog } from "@/core/components/confirm-dialog.component";
import { cancelBookingAction } from "@/features/bookings/booking.action";

interface CancelBookingButtonProps {
  bookingId: string;
}

export function CancelBookingButton({ bookingId }: CancelBookingButtonProps) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleConfirm() {
    setLoading(true);
    setError(null);
    const result = await cancelBookingAction(bookingId);
    setLoading(false);
    if (!result.success) {
      setError(result.error);
      return;
    }
    setOpen(false);
    router.refresh();
  }

  return (
    <div className="flex flex-col items-end gap-2">
      <Button testId="cancel-booking-button" variant="destructive" onClick={() => setOpen(true)}>
        Cancel Booking
      </Button>
      {error && (
        <p className="text-sm text-red-500" data-testid="cancel-booking-error">
          {error}
        </p>
      )}
      <ConfirmDialog
        open={open}
        onClose={() => setOpen(false)}
        onConfirm={handleConfirm}
        title="Cancel booking"
        message="Are you sure you want to cancel this booking? This cannot be undone."
        confirmLabel="Cancel booking"
        destructive
        loading={loading}
        testId="cancel-booking-confirm-dialog"
      />
    </div>
  );
}

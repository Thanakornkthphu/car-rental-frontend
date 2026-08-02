"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { CreditCard } from "lucide-react";
import { Card } from "@/core/components/card.component";
import { Input } from "@/core/components/input.component";
import { Button } from "@/core/components/button.component";
import { createBookingAction } from "@/features/bookings/booking.action";

interface BookingFormProps {
  carId: string;
  startDate: string;
  endDate: string;
}

const EMPTY_PAYMENT = { cardNumber: "", cardHolder: "", expiryMonth: "", expiryYear: "", cvv: "" };

export function BookingForm({ carId, startDate, endDate }: BookingFormProps) {
  const router = useRouter();
  const [payment, setPayment] = useState(EMPTY_PAYMENT);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  function updateField<K extends keyof typeof EMPTY_PAYMENT>(key: K, value: string) {
    setPayment((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setSubmitting(true);
    setError(null);
    const result = await createBookingAction({ carId, startDate, endDate, ...payment });
    setSubmitting(false);
    if (!result.success) {
      setError(result.error);
      return;
    }
    router.push(`/bookings/${result.data.bookingId}/confirmation`);
  }

  return (
    <Card padding="md">
      <form onSubmit={handleSubmit} data-testid="booking-payment-form" className="flex flex-col gap-4">
        <div className="flex items-center gap-2 text-sm font-medium text-foreground">
          <CreditCard className="size-4" aria-hidden="true" />
          Payment details
        </div>
        <Input
          label="Card number"
          testId="payment-card-number-input"
          inputMode="numeric"
          maxLength={16}
          value={payment.cardNumber}
          onChange={(event) => updateField("cardNumber", event.target.value.replace(/\D/g, ""))}
          required
        />
        <Input
          label="Cardholder name"
          testId="payment-card-holder-input"
          value={payment.cardHolder}
          onChange={(event) => updateField("cardHolder", event.target.value)}
          required
        />
        <div className="grid grid-cols-3 gap-3">
          <Input
            label="MM"
            testId="payment-expiry-month-input"
            inputMode="numeric"
            maxLength={2}
            value={payment.expiryMonth}
            onChange={(event) => updateField("expiryMonth", event.target.value.replace(/\D/g, ""))}
            required
          />
          <Input
            label="YYYY"
            testId="payment-expiry-year-input"
            inputMode="numeric"
            maxLength={4}
            value={payment.expiryYear}
            onChange={(event) => updateField("expiryYear", event.target.value.replace(/\D/g, ""))}
            required
          />
          <Input
            label="CVV"
            testId="payment-cvv-input"
            inputMode="numeric"
            maxLength={4}
            value={payment.cvv}
            onChange={(event) => updateField("cvv", event.target.value.replace(/\D/g, ""))}
            required
          />
        </div>
        {error && (
          <p className="text-sm text-red-500" data-testid="booking-payment-error">
            {error}
          </p>
        )}
        <Button testId="booking-payment-submit-button" type="submit" loading={submitting} className="w-full">
          Confirm &amp; Pay
        </Button>
      </form>
    </Card>
  );
}

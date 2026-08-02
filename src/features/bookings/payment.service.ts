import type { CreatePaymentInput, Payment } from "@/core/types/booking.type";
import { maskCardNumber } from "@/core/utils/format.util";
import { MOCK_PAYMENTS } from "@/features/bookings/payment.mock";

export async function recordPayment(input: CreatePaymentInput, amount: number): Promise<Payment> {
  const payment: Payment = {
    _id: crypto.randomUUID(),
    bookingId: input.bookingId,
    last4: maskCardNumber(input.cardNumber),
    cardHolder: input.cardHolder,
    amount,
    status: "paid",
    createdAt: new Date().toISOString(),
  };
  MOCK_PAYMENTS.push(payment);
  return payment;
}

export async function getPaymentByBooking(bookingId: string): Promise<Payment | null> {
  return MOCK_PAYMENTS.find((payment) => payment.bookingId === bookingId) ?? null;
}

import { apiFetch } from "@/core/services/api.service";
import type { CreatePaymentInput, Payment } from "@/core/types/booking.type";

interface ApiPayment {
  _id?: string;
  id?: string;
  booking?: string;
  bookingId?: string;
  cardLast4?: string;
  cardHolder: string;
  amount: number;
  status: "success" | "failed";
  paidAt?: string;
  createdAt?: string;
}

function toPayment(payment: ApiPayment): Payment {
  return {
    _id: payment._id ?? payment.id ?? "",
    bookingId: payment.bookingId ?? payment.booking ?? "",
    last4: payment.cardLast4 ?? "",
    cardHolder: payment.cardHolder,
    amount: payment.amount,
    status: payment.status === "success" ? "paid" : "failed",
    createdAt: payment.createdAt ?? payment.paidAt ?? "",
  };
}

export async function recordPayment(input: CreatePaymentInput): Promise<Payment> {
  const response = await apiFetch<{ payment: ApiPayment }>("/payment/pay", {
    method: "POST",
    body: JSON.stringify(input),
  });
  return toPayment(response.payment);
}

export async function getPaymentByBooking(bookingId: string): Promise<Payment | null> {
  try {
    return toPayment(await apiFetch<ApiPayment>(`/payment/${bookingId}`));
  } catch {
    return null;
  }
}

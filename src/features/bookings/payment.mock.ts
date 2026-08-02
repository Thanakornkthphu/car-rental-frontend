import type { Payment } from "@/core/types/booking.type";

export const MOCK_PAYMENTS: Payment[] = [
  { _id: "payment-01", bookingId: "booking-01", last4: "4242", cardHolder: "Somchai Jai", amount: 4200, status: "paid", createdAt: "2026-07-28T09:12:00.000Z" },
  { _id: "payment-02", bookingId: "booking-02", last4: "1881", cardHolder: "Somchai Jai", amount: 5700, status: "paid", createdAt: "2026-05-20T14:02:00.000Z" },
  { _id: "payment-05", bookingId: "booking-05", last4: "0055", cardHolder: "Admin User", amount: 11400, status: "paid", createdAt: "2026-07-30T07:00:00.000Z" },
];

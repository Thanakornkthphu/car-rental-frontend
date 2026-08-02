export type BookingStatus = "pending" | "confirmed" | "completed" | "cancelled";

export interface Booking {
  _id: string;
  car: string;
  userId: string;
  startDate: string;
  endDate: string;
  totalPrice: number;
  status: BookingStatus;
  createdAt: string;
  updatedAt: string;
}

export interface CreateBookingInput {
  car: string;
  startDate: string;
  endDate: string;
  totalPrice: number;
}

export interface BookingSearchParams {
  page?: number;
  limit?: number;
  status?: BookingStatus;
  sortBy?: "startDate" | "createdAt" | "totalPrice";
  sortOrder?: "asc" | "desc";
}

export interface Payment {
  _id: string;
  bookingId: string;
  last4: string;
  cardHolder: string;
  amount: number;
  status: "paid" | "failed";
  createdAt: string;
}

export interface CreatePaymentInput {
  bookingId: string;
  cardNumber: string;
  cardHolder: string;
  expiryMonth: string;
  expiryYear: string;
  cvv: string;
}

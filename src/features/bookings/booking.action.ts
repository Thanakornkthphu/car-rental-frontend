"use server";

import { revalidatePath } from "next/cache";
import type { BookingStatus } from "@/core/types/booking.type";
import { isValidDateRange } from "@/core/utils/validation.util";
import { getCarById } from "@/features/cars/car.service";
import { createBooking, deleteBooking, getBookingById, updateBookingStatus } from "@/features/bookings/booking.service";
import { recordPayment } from "@/features/bookings/payment.service";
import { getCurrentUser } from "@/features/auth/auth.service";

type ActionResult<T = undefined> = { success: true; data: T } | { success: false; error: string };

function revalidateBookingPaths() {
  revalidatePath("/bookings");
  revalidatePath("/admin/bookings");
}

interface CreateBookingParams {
  carId: string;
  startDate: string;
  endDate: string;
  cardNumber: string;
  cardHolder: string;
  expiryMonth: string;
  expiryYear: string;
  cvv: string;
}

export async function createBookingAction(params: CreateBookingParams): Promise<ActionResult<{ bookingId: string }>> {
  const user = await getCurrentUser();
  if (!user) return { success: false, error: "Please log in to book a car." };

  if (!isValidDateRange(params.startDate, params.endDate)) {
    return { success: false, error: "Please choose a valid date range." };
  }

  const car = await getCarById(params.carId);
  if (!car || !car.available) return { success: false, error: "This car is no longer available." };

  const rawCardNumber = params.cardNumber.replace(/\s/g, "");
  if (rawCardNumber.length !== 16 || params.cvv.length < 3 || !params.cardHolder.trim()) {
    return { success: false, error: "Please check your payment details." };
  }

  try {
    const booking = await createBooking({
      car: params.carId,
      startDate: params.startDate,
      endDate: params.endDate,
    });
    const payment = await recordPayment(
      {
        bookingId: booking._id,
        cardNumber: rawCardNumber,
        cardHolder: params.cardHolder,
        expiryMonth: params.expiryMonth,
        expiryYear: params.expiryYear,
        cvv: params.cvv,
      }
    );
    if (payment.status === "failed") return { success: false, error: "Payment was declined." };

    revalidateBookingPaths();
    return { success: true, data: { bookingId: booking._id } };
  } catch (error) {
    return { success: false, error: error instanceof Error ? error.message : "Unable to create booking." };
  }
}

export async function cancelBookingAction(bookingId: string): Promise<ActionResult> {
  const user = await getCurrentUser();
  if (!user) return { success: false, error: "Please log in." };

  const booking = await getBookingById(bookingId);
  if (!booking) return { success: false, error: "Booking not found." };
  if (booking.userId !== user._id && !user.isAdmin) return { success: false, error: "Not authorized." };
  if (booking.status === "completed" || booking.status === "cancelled") {
    return { success: false, error: "This booking can no longer be cancelled." };
  }

  try {
    await deleteBooking(bookingId);
    revalidateBookingPaths();
    return { success: true, data: undefined };
  } catch (error) {
    return { success: false, error: error instanceof Error ? error.message : "Unable to cancel booking." };
  }
}

export async function updateBookingStatusAction(bookingId: string, status: BookingStatus): Promise<ActionResult> {
  const user = await getCurrentUser();
  if (!user?.isAdmin) return { success: false, error: "Not authorized." };

  try {
    await updateBookingStatus(bookingId, status);
    revalidateBookingPaths();
    return { success: true, data: undefined };
  } catch (error) {
    return { success: false, error: error instanceof Error ? error.message : "Unable to update booking." };
  }
}

export async function deleteBookingAction(bookingId: string): Promise<ActionResult> {
  const user = await getCurrentUser();
  if (!user?.isAdmin) return { success: false, error: "Not authorized." };

  try {
    await deleteBooking(bookingId);
    revalidateBookingPaths();
    return { success: true, data: undefined };
  } catch (error) {
    return { success: false, error: error instanceof Error ? error.message : "Unable to cancel booking." };
  }
}

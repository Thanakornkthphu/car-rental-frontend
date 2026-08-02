import type { Booking, BookingSearchParams, BookingStatus, CreateBookingInput } from "@/core/types/booking.type";
import type { Paginated } from "@/core/types/pagination.type";
import { MOCK_BOOKINGS } from "@/features/bookings/booking.mock";

const DEFAULT_PAGE_SIZE = 6;

export async function getBookings(
  filters: BookingSearchParams & { userId?: string } = {}
): Promise<Paginated<Booking>> {
  let results = filters.userId ? MOCK_BOOKINGS.filter((booking) => booking.userId === filters.userId) : [...MOCK_BOOKINGS];

  if (filters.status) results = results.filter((booking) => booking.status === filters.status);

  const sortBy = filters.sortBy ?? "createdAt";
  const direction = filters.sortOrder === "asc" ? 1 : -1;
  results = results.toSorted((a, b) => (a[sortBy] > b[sortBy] ? direction : -direction));

  const page = filters.page ?? 1;
  const limit = filters.limit ?? DEFAULT_PAGE_SIZE;
  const start = (page - 1) * limit;
  const data = results.slice(start, start + limit);

  return { data, total: results.length, page, totalPages: Math.max(Math.ceil(results.length / limit), 1) };
}

export async function getBookingById(id: string): Promise<Booking | null> {
  return MOCK_BOOKINGS.find((booking) => booking._id === id) ?? null;
}

export async function createBooking(input: CreateBookingInput & { userId: string }): Promise<Booking> {
  const now = new Date().toISOString();
  const booking: Booking = {
    _id: crypto.randomUUID(),
    car: input.car,
    userId: input.userId,
    startDate: input.startDate,
    endDate: input.endDate,
    totalPrice: input.totalPrice,
    status: "confirmed",
    createdAt: now,
    updatedAt: now,
  };
  MOCK_BOOKINGS.unshift(booking);
  return booking;
}

export async function updateBookingStatus(id: string, status: BookingStatus): Promise<Booking> {
  const index = MOCK_BOOKINGS.findIndex((booking) => booking._id === id);
  if (index === -1) throw new Error("Booking not found");
  const updated: Booking = { ...MOCK_BOOKINGS[index], status, updatedAt: new Date().toISOString() };
  MOCK_BOOKINGS[index] = updated;
  return updated;
}

export async function deleteBooking(id: string): Promise<void> {
  const index = MOCK_BOOKINGS.findIndex((booking) => booking._id === id);
  if (index === -1) throw new Error("Booking not found");
  MOCK_BOOKINGS.splice(index, 1);
}

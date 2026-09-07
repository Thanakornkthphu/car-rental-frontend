import { apiFetch } from "@/core/services/api.service";
import type { Booking, BookingSearchParams, BookingStatus, CreateBookingInput } from "@/core/types/booking.type";
import type { Paginated } from "@/core/types/pagination.type";

interface ApiBooking {
  _id?: string;
  id?: string;
  user?: string | { _id?: string; id?: string };
  car: string | { _id?: string; id?: string };
  startDate: string;
  endDate: string;
  totalPrice: number;
  status: BookingStatus;
  createdAt?: string;
  updatedAt?: string;
}

interface BookingsResponse {
  data: ApiBooking[];
  meta: { total: number; page: string | number; totalPages: number };
}

function toId(value: string | { _id?: string; id?: string }): string {
  return typeof value === "string" ? value : value._id ?? value.id ?? "";
}

function toBooking(booking: ApiBooking): Booking {
  return {
    _id: booking._id ?? booking.id ?? "",
    car: toId(booking.car),
    userId: booking.user ? toId(booking.user) : "",
    startDate: booking.startDate,
    endDate: booking.endDate,
    totalPrice: booking.totalPrice,
    status: booking.status,
    createdAt: booking.createdAt ?? "",
    updatedAt: booking.updatedAt ?? "",
  };
}

export async function getBookings(filters: BookingSearchParams & { userId?: string } = {}): Promise<Paginated<Booking>> {
  const params = new URLSearchParams();
  if (filters.status) params.set("status", filters.status);
  if (filters.page) params.set("page", String(filters.page));
  if (filters.limit) params.set("limit", String(filters.limit));
  if (filters.sortBy) params.set("sortBy", filters.sortBy);
  if (filters.sortOrder) params.set("sortOrder", filters.sortOrder);
  const response = await apiFetch<BookingsResponse>(`/booking${params.size ? `?${params}` : ""}`);
  return {
    data: response.data.map(toBooking),
    total: response.meta.total,
    page: Number(response.meta.page),
    totalPages: Math.max(response.meta.totalPages, 1),
  };
}

export async function getBookingById(id: string): Promise<Booking | null> {
  try {
    return toBooking(await apiFetch<ApiBooking>(`/booking/${id}`));
  } catch {
    return null;
  }
}

export async function createBooking(input: Pick<CreateBookingInput, "car" | "startDate" | "endDate">): Promise<Booking> {
  const response = await apiFetch<{ booking: ApiBooking }>("/booking", {
    method: "POST",
    body: JSON.stringify({ car: input.car, startDate: new Date(input.startDate).toISOString(), endDate: new Date(input.endDate).toISOString() }),
  });
  return toBooking(response.booking);
}

export async function updateBookingStatus(id: string, status: BookingStatus): Promise<Booking> {
  const response = await apiFetch<{ booking: ApiBooking }>(`/booking/${id}`, {
    method: "PATCH",
    body: JSON.stringify({ status }),
  });
  return toBooking(response.booking);
}

export async function deleteBooking(id: string): Promise<void> {
  await apiFetch(`/booking/${id}`, { method: "DELETE" });
}

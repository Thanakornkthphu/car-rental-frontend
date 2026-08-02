import type { Booking } from "@/core/types/booking.type";

export const DEMO_USER_ID = "user-01";
export const DEMO_ADMIN_ID = "admin-01";

export const MOCK_BOOKINGS: Booking[] = [
  {
    _id: "booking-01",
    car: "car-02",
    userId: DEMO_USER_ID,
    startDate: "2026-08-10T00:00:00.000Z",
    endDate: "2026-08-13T00:00:00.000Z",
    totalPrice: 4200,
    status: "confirmed",
    createdAt: "2026-07-28T09:12:00.000Z",
    updatedAt: "2026-07-28T09:12:00.000Z",
  },
  {
    _id: "booking-02",
    car: "car-05",
    userId: DEMO_USER_ID,
    startDate: "2026-06-01T00:00:00.000Z",
    endDate: "2026-06-04T00:00:00.000Z",
    totalPrice: 5700,
    status: "completed",
    createdAt: "2026-05-20T14:02:00.000Z",
    updatedAt: "2026-06-04T10:00:00.000Z",
  },
  {
    _id: "booking-03",
    car: "car-09",
    userId: DEMO_USER_ID,
    startDate: "2026-08-20T00:00:00.000Z",
    endDate: "2026-08-22T00:00:00.000Z",
    totalPrice: 9000,
    status: "pending",
    createdAt: "2026-08-01T18:45:00.000Z",
    updatedAt: "2026-08-01T18:45:00.000Z",
  },
  {
    _id: "booking-04",
    car: "car-03",
    userId: DEMO_USER_ID,
    startDate: "2026-04-10T00:00:00.000Z",
    endDate: "2026-04-12T00:00:00.000Z",
    totalPrice: 3600,
    status: "cancelled",
    createdAt: "2026-04-01T11:20:00.000Z",
    updatedAt: "2026-04-02T08:00:00.000Z",
  },
  {
    _id: "booking-05",
    car: "car-10",
    userId: DEMO_ADMIN_ID,
    startDate: "2026-08-15T00:00:00.000Z",
    endDate: "2026-08-18T00:00:00.000Z",
    totalPrice: 11400,
    status: "confirmed",
    createdAt: "2026-07-30T07:00:00.000Z",
    updatedAt: "2026-07-30T07:00:00.000Z",
  },
];

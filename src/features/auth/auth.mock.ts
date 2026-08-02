import type { User } from "@/core/types/user.type";

// Demo credentials only — plain-text passwords are fine here since this phase
// has no real backend; swap for real auth against NEXT_PUBLIC_API_URL later.
interface MockUserRecord extends User {
  password: string;
}

export const MOCK_USERS: MockUserRecord[] = [
  {
    _id: "user-01",
    name: "Somchai Jai",
    email: "guest@example.com",
    password: "password123",
    isAdmin: false,
    createdAt: "2026-01-15T00:00:00.000Z",
  },
  {
    _id: "admin-01",
    name: "Admin User",
    email: "admin@example.com",
    password: "admin123",
    isAdmin: true,
    createdAt: "2026-01-01T00:00:00.000Z",
  },
];

export const SESSION_COOKIE_NAME = "session_user_id";

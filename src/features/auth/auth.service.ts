import { cookies } from "next/headers";
import type { LoginInput, SignupInput, User } from "@/core/types/user.type";
import { MOCK_USERS, SESSION_COOKIE_NAME } from "@/features/auth/auth.mock";

function toPublicUser(record: (typeof MOCK_USERS)[number]): User {
  return { _id: record._id, name: record.name, email: record.email, isAdmin: record.isAdmin, createdAt: record.createdAt };
}

export async function findUserByCredentials(input: LoginInput): Promise<User | null> {
  const record = MOCK_USERS.find((user) => user.email === input.email && user.password === input.password);
  return record ? toPublicUser(record) : null;
}

export async function findUserByEmail(email: string): Promise<User | null> {
  const record = MOCK_USERS.find((user) => user.email === email);
  return record ? toPublicUser(record) : null;
}

export async function createUser(input: SignupInput): Promise<User> {
  const record = {
    _id: crypto.randomUUID(),
    name: input.name,
    email: input.email,
    password: input.password,
    isAdmin: false,
    createdAt: new Date().toISOString(),
  };
  MOCK_USERS.push(record);
  return toPublicUser(record);
}

export async function getUserById(id: string): Promise<User | null> {
  const record = MOCK_USERS.find((user) => user._id === id);
  return record ? toPublicUser(record) : null;
}

export async function getCurrentUser(): Promise<User | null> {
  const cookieStore = await cookies();
  const userId = cookieStore.get(SESSION_COOKIE_NAME)?.value;
  if (!userId) return null;
  return getUserById(userId);
}

export async function createSession(userId: string): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE_NAME, userId, {
    httpOnly: true,
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7,
    path: "/",
  });
}

export async function clearSession(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE_NAME);
}

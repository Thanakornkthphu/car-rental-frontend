import { cookies } from "next/headers";
import { ACCESS_TOKEN_COOKIE_NAME, apiFetch } from "@/core/services/api.service";
import type { LoginInput, SignupInput, User } from "@/core/types/user.type";

interface ApiUser {
  _id?: string;
  id?: string;
  name: string;
  email: string;
  role: "admin" | "user";
  createdAt?: string;
}

interface LoginResponse {
  accessToken: string;
  user: ApiUser;
}

function toUser(user: ApiUser): User {
  return {
    _id: user._id ?? user.id ?? "",
    name: user.name,
    email: user.email,
    isAdmin: user.role === "admin",
    createdAt: user.createdAt ?? "",
  };
}

export async function login(input: LoginInput): Promise<{ accessToken: string; user: User }> {
  const response = await apiFetch<LoginResponse>("/auth/login", { method: "POST", data: input });
  return { accessToken: response.accessToken, user: toUser(response.user) };
}

export async function signup(input: SignupInput): Promise<void> {
  await apiFetch("/auth/signup", { method: "POST", data: input });
}

export async function getUserById(id: string): Promise<User | null> {
  const users = await apiFetch<ApiUser[]>("/user/allUsers");
  const user = users.find((item) => (item._id ?? item.id) === id);
  return user ? toUser(user) : null;
}

export async function getCurrentUser(): Promise<User | null> {
  const token = (await cookies()).get(ACCESS_TOKEN_COOKIE_NAME)?.value;
  if (!token) return null;

  try {
    return toUser(await apiFetch<ApiUser>("/user/profile/me"));
  } catch {
    return null;
  }
}

export async function createSession(accessToken: string): Promise<void> {
  (await cookies()).set(ACCESS_TOKEN_COOKIE_NAME, accessToken, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60,
    path: "/",
  });
}

export async function clearSession(): Promise<void> {
  (await cookies()).delete(ACCESS_TOKEN_COOKIE_NAME);
}

import "server-only";
import { cookies } from "next/headers";

export const ACCESS_TOKEN_COOKIE_NAME = "access_token";

interface ApiErrorBody {
  message?: string | string[];
}

export async function apiFetch<T>(path: string, init: RequestInit = {}): Promise<T> {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;
  if (!baseUrl) throw new Error("NEXT_PUBLIC_API_URL is not configured.");

  const token = (await cookies()).get(ACCESS_TOKEN_COOKIE_NAME)?.value;
  const response = await fetch(new URL(path, baseUrl), {
    ...init,
    cache: "no-store",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...init.headers,
    },
  });

  if (response.ok) return response.json() as Promise<T>;

  const body = (await response.json().catch(() => ({}))) as ApiErrorBody;
  throw new Error(Array.isArray(body.message) ? body.message.join(", ") : body.message || "Request failed.");
}

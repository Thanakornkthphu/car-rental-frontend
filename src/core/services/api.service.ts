import "server-only";
import axios, { type AxiosRequestConfig } from "axios";
import { cookies } from "next/headers";
import { apiClient } from "@/core/services/api-client.service";

export const ACCESS_TOKEN_COOKIE_NAME = "access_token";

interface ApiErrorBody {
  message?: string | string[];
}

export async function apiFetch<T>(path: string, config: AxiosRequestConfig = {}): Promise<T> {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;
  if (!baseUrl) throw new Error("NEXT_PUBLIC_API_URL is not configured.");

  const token = (await cookies()).get(ACCESS_TOKEN_COOKIE_NAME)?.value;
  try {
    const { data, status } = await apiClient.request<T>({
      url: path,
      ...config,
      headers: { ...config.headers, ...(token ? { Authorization: `Bearer ${token}` } : {}) },
    });
    if (process.env.NODE_ENV === "development") {
      console.log("API response", { path, status, data });
    }
    return data;
  } catch (error) {
    if (!axios.isAxiosError<ApiErrorBody>(error)) throw error;
    const message = error.response?.data?.message;
    throw new Error(Array.isArray(message) ? message.join(", ") : message || "Request failed.");
  }
}

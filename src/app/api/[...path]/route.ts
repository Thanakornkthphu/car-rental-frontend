import axios from "axios";
import type { NextRequest } from "next/server";
import { ACCESS_TOKEN_COOKIE_NAME } from "@/core/services/api.service";

interface ProxyContext {
  params: Promise<{ path: string[] }>;
}

async function proxyRequest(request: NextRequest, { params }: ProxyContext) {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  if (!apiUrl) return Response.json({ message: "NEXT_PUBLIC_API_URL is not configured." }, { status: 500 });

  const { path } = await params;
  const targetUrl = new URL(path.map(encodeURIComponent).join("/"), `${apiUrl}/`);
  targetUrl.search = request.nextUrl.search;
  const token = request.cookies.get(ACCESS_TOKEN_COOKIE_NAME)?.value;
  const body = request.method === "GET" || request.method === "HEAD" ? undefined : await request.arrayBuffer();

  try {
    const response = await axios.request<ArrayBuffer>({
      url: targetUrl.toString(),
      method: request.method,
      data: body,
      responseType: "arraybuffer",
      validateStatus: () => true,
      headers: {
        ...(request.headers.get("content-type") ? { "Content-Type": request.headers.get("content-type") } : {}),
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    });

    const contentType = response.headers["content-type"];

    return new Response(response.data, {
      status: response.status,
      headers: typeof contentType === "string" ? { "Content-Type": contentType } : undefined,
    });
  } catch {
    return Response.json({ message: "Unable to reach the backend API." }, { status: 502 });
  }
}

export const GET = proxyRequest;
export const POST = proxyRequest;
export const PUT = proxyRequest;
export const PATCH = proxyRequest;
export const DELETE = proxyRequest;

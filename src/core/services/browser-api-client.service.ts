import axios from "axios";

export const browserApiClient = axios.create({
  baseURL: "/api",
  headers: { "Content-Type": "application/json" },
});

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [{ hostname: "api.dicebear.com" }, { hostname: "loremflickr.com" }],
  },
};

export default nextConfig;

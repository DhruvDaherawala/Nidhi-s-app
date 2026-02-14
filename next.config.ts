import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // @ts-expect-error: eslint config is valid but types might be outdated or strict
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;

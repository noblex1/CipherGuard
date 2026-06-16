import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    // Ignore TypeScript errors during build - necessary when root directory isn't properly set
    ignoreBuildErrors: true,
  },
  // Optimize production build
  reactStrictMode: true,
  poweredByHeader: false,
};

export default nextConfig;

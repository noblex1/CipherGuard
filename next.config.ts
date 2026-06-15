import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    // Ignore TypeScript errors during build (optional - for faster builds)
    // ignoreBuildErrors: true,
  },
  eslint: {
    // Ignore ESLint errors during build (optional)
    // ignoreDuringBuilds: true,
  },
  // Optimize production build
  reactStrictMode: true,
  poweredByHeader: false,
};

export default nextConfig;

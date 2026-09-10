import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Curated stock photography stands in for the client's real gym/trainer
    // photos until those arrive (see client-intake-checklist.md).
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
    ],
  },
};

export default nextConfig;

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Kept unoptimized so behaviour is identical on every host (no runtime
    // sharp dependency). Heavy assets are pre-compressed to WebP at the source
    // instead — e.g. the hero globe is a 202 KB WebP (was a 1.9 MB PNG), which
    // is what makes the hero load seamlessly on phones/tablets.
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
    ];
  },
};

export default nextConfig;

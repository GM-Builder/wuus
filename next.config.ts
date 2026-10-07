import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  turbopack: {
    root: path.resolve("."),
  },
  async redirects() {
    return [{ source: '/:path*', has: [{ type: 'host', value: 'www\\.webuntukusaha\\.com' }],
      destination: 'https://webuntukusaha.com/:path*', permanent: true }];
  },
  devIndicators: {
    position: "bottom-right",
  },
  logging: {
    fetches: {
      fullUrl: false,
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

export default nextConfig;


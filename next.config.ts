import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'static.gamezop.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;

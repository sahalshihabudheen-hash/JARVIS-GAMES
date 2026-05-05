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
      {
        protocol: 'https',
        hostname: 'img.gamedistribution.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;

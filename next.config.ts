import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'pekebyte.test',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'pekebyte.test',
        port: '',
        pathname: '/**',
      }
    ],
    unoptimized: true
  },
};

export default nextConfig;

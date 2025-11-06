import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'pekebyte.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'pekebyte.com',
        port: '',
        pathname: '/**',
      }
    ]
  },
};

export default nextConfig;

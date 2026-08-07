import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    optimizePackageImports: ['lucide-react', 'react-icons'],
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'qjxrfmmwukafovfzdjlq.supabase.co',
        port: '',
        pathname: '/**',
      },
    ],
  },
  async redirects() {
    return [
      {
        source: '/usuario',
        destination: '/',
        permanent: false,
      },
      {
        source: '/usuario/:path*',
        destination: '/',
        permanent: false,
      },
      {
        source: '/login',
        destination: '/',
        permanent: false,
      },
      {
        source: '/registro',
        destination: '/',
        permanent: false,
      },
    ];
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://localhost:3000/:path*',
      },
    ];
  },
};

export default nextConfig;

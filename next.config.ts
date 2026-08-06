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
};

export default nextConfig;

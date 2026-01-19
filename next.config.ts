import type { NextConfig } from "next";
// next.config.ts
const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '/**', // Permite todas las rutas dentro de Cloudinary
      },
    ],
  },
};

export default nextConfig;
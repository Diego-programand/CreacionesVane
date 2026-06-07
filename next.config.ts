import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'res.cloudinary.com', pathname: '/**' },
      { protocol: 'https', hostname: 'cdn.sanity.io', pathname: '/**' },
    ],
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },

  compress: true,

  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-DNS-Prefetch-Control', value: 'on' },
          /*
            HSTS con max-age 2 años, includeSubDomains y preload.
            Una vez el dominio esté en la preload list de Chromium, los navegadores
            forzarán HTTPS sin consultar el servidor — esto cubre el caso del HTTP
            indexado que detectó GSC (15 impresiones en la versión http://).
          */
          { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Cross-Origin-Opener-Policy', value: 'same-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(self), browsing-topics=()' },
        ],
      },
      {
        source: '/images/:path*',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }],
      },
      {
        source: '/fonts/:path*',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }],
      },
      /* /llms.txt y /robots.txt necesitan estar siempre frescos para crawlers */
      {
        source: '/llms.txt',
        headers: [
          { key: 'Content-Type', value: 'text/markdown; charset=utf-8' },
          { key: 'Cache-Control', value: 'public, max-age=3600, must-revalidate' },
        ],
      },
    ];
  },

  async redirects() {
    return [
      /* www -> non-www (mantiene autoridad consolidada en host canónico) */
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'www.creacionesvane.com' }],
        destination: 'https://creacionesvane.com/:path*',
        permanent: true,
      },
      /*
        Nota sobre HTTP -> HTTPS:
        Vercel termina TLS en el edge y ya rechaza HTTP en producción para dominios
        gestionados. La señal de "HTTP indexado" en GSC corresponde a snapshots viejos
        de Google que se purgarán cuando se solicite re-indexación de las URLs http://
        afectadas vía Search Console. HSTS con preload (arriba) sella el lado cliente.
      */
    ];
  },

  experimental: {
    optimizePackageImports: ['framer-motion'],
  },
};

export default nextConfig;

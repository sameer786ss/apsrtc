import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  // Firebase web config. Plain names in the host's env settings; this exposes them to browser code at build time.
  env: {
    FIREBASE_API_KEY: process.env.FIREBASE_API_KEY,
    FIREBASE_AUTH_DOMAIN: process.env.FIREBASE_AUTH_DOMAIN,
    FIREBASE_PROJECT_ID: process.env.FIREBASE_PROJECT_ID,
    FIREBASE_STORAGE_BUCKET: process.env.FIREBASE_STORAGE_BUCKET,
    FIREBASE_APP_ID: process.env.FIREBASE_APP_ID,
  },
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'firebasestorage.googleapis.com', port: '', pathname: '/**' },
    ],
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200],
    imageSizes: [64, 128, 256, 384],
    minimumCacheTTL: 3600,
  },
  async redirects() {
    return [
      { source: '/blog', destination: '/', permanent: true },
    ];
  },
};

export default nextConfig;

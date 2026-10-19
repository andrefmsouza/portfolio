import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
  },
  experimental: {
    // O root layout fica em app/[lang], então o 404 global precisa de arquivo próprio
    globalNotFound: true,
  },
};

export default nextConfig;

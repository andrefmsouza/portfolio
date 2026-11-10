import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Permite abrir o dev server pelo IP da rede local (ex.: celular), não só localhost
  allowedDevOrigins: ["192.168.1.6", "192.168.18.8"],
  images: {
    unoptimized: true,
  },
  experimental: {
    // O root layout fica em app/[lang], então o 404 global precisa de arquivo próprio
    globalNotFound: true,
  },
};

export default nextConfig;

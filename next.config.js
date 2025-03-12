/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configuração de internacionalização nativa do Next.js
  experimental: {
    appDir: true,
  },
  images: {
    domains: [],
    unoptimized: true
  }
}

module.exports = nextConfig 
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["10.5.0.2"],
  images: {
    // AVIF primeiro (bem menor que WebP/PNG), WebP como alternativa
    formats: ["image/avif", "image/webp"],
    // imagens estáticas não mudam: cache longo no CDN
    minimumCacheTTL: 60 * 60 * 24 * 30,
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
  },
  // lucide-react e gsap: importa só o que é usado
  experimental: {
    optimizePackageImports: ["lucide-react"],
  },
};

export default nextConfig;

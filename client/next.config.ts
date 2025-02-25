import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    optimizePackageImports: ["react-icons"],
  },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "yvhyyrgnjekpdcaqlufo.supabase.co" },
    ],
  },
};

export default nextConfig;

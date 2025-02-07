import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "storage.googleapis.com" },
      { protocol: "https", hostname: "yvhyyrgnjekpdcaqlufo.supabase.co" },
    ],
  },
};

export default nextConfig;

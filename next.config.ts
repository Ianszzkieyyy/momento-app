import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {protocol: 'https', hostname: 'dgayehypggtgtoytzvei.supabase.co'}
    ]
  },
};

export default nextConfig;

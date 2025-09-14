import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  images: {
    domains: ["firebasestorage.googleapis.com"],
  },
  webpack: (config, { isServer }) => {
    // Ignore the problematic directory
    config.watchOptions = {
      ...config.watchOptions,
      ignored: [
        "**/node_modules/**",
        "**/.next/**",
        "C:\\Users\\sejal\\AppData\\Local\\Microsoft\\WindowsApps\\**",
      ],
    };
    return config;
  },
};

export default nextConfig;

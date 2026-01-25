import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {},
  images: {
    domains: ["firebasestorage.googleapis.com"],
  },
  webpack: (config) => {
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

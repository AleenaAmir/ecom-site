import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["res.cloudinary.com"], 
    appDir: true,
  },
};

export default nextConfig;

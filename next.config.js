/** @type {import('next').NextConfig} */
const nextConfig = {
  // Only use "export" for production builds
  output: process.env.NODE_ENV === "production" ? "export" : undefined,
  reactStrictMode: true,
  images: {
    unoptimized: false,
    domains: ["source.unsplash.com"],
    formats: ["image/avif", "image/webp"],
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
};

module.exports = nextConfig;
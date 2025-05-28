/** @type {import('next').NextConfig} */
const nextConfig = {
  // Only use "export" for production builds
  output: process.env.NODE_ENV === "production" ? "export" : undefined,
  reactStrictMode: true,
  images: {
    unoptimized: true,
    domains: ["source.unsplash.com"],
  },
};

module.exports = nextConfig;
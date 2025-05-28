/** @type {import('next').NextConfig} */
const nextConfig = {
  // Always use "export" for Netlify deployment
  output: "export",
  reactStrictMode: true,
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
};

module.exports = nextConfig;

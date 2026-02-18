/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*",
      },
    ],
  },
  typescript: {
    ignoreBuildErrors: process.env.VERCEL_ENV === "production",
  },
  eslint: {
    ignoreDuringBuilds: process.env.VERCEL_ENV === "production",
  },
};

module.exports = nextConfig;

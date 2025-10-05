/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // Don’t fail the production build on ESLint errors.
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Optional: if TS types are noisy, don’t fail builds.
    // (Remove when you want stricter prod builds)
    ignoreBuildErrors: true,
  },
  images: {
    // You’re using <img>; keep Next/Image strictness off for now.
    unoptimized: true,
  },
};

export default nextConfig;

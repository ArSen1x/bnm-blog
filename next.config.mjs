/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // Allow remote cover images if you ever host them elsewhere.
    remotePatterns: [{ protocol: "https", hostname: "**" }],
  },
};

export default nextConfig;

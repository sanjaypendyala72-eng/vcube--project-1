/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: '/nexora',
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
};

export default nextConfig;


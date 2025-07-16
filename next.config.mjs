/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // Disable ESLint during build to avoid TypeScript parser issues
    ignoreDuringBuilds: true,
  },
  images: {
    domains: ['plus.unsplash.com', 'images.unsplash.com', 'unsplash.com', 'example.com', 'cdn.vox-cdn.com', 'images.aeonmedia.co', 'public.blob.vercel-storage.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'example.com',
      },
      {
        protocol: 'https',
        hostname: 'cdn.vox-cdn.com',
      },
      {
        protocol: 'https',
        hostname: 'images.aeonmedia.co',
      },
      {
        protocol: 'https',
        hostname: '**.blob.vercel-storage.com',
      },
    ],
  },
};

export default nextConfig;

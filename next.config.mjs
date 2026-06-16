/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'images.pexels.com' },
      { protocol: 'https', hostname: 'videos.pexels.com' },
    ],
  },
  // Arabic-primary: the bare root sends visitors to /ar.
  async redirects() {
    return [{ source: '/', destination: '/ar', permanent: true }];
  },
};

export default nextConfig;

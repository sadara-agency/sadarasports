/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  serverExternalPackages: ['jsdom', 'isomorphic-dompurify'],
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'images.pexels.com' },
      { protocol: 'https', hostname: 'videos.pexels.com' },
      { protocol: 'https', hostname: 'picsum.photos' },
    ],
  },
  // English-primary: the bare root sends visitors to /en.
  async redirects() {
    return [{ source: '/', destination: '/en', permanent: true }];
  },
};

export default nextConfig;

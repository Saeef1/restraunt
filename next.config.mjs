/** @type {import('next').NextConfig} */
const nextConfig = {
   images: {  
    domains: ['res.cloudinary.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.google.com',
      },
      {
        protocol: 'https',
        hostname: 'www.escoffieronline.com',
      },
    ],
  },
};

export default nextConfig;

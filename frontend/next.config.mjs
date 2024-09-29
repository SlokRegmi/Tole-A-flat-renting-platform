/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
      domains: ['localhost', 'asset.cloudinary.com', 'picsum.photos'], // Add both Cloudinary and Picsum domains
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'asset.cloudinary.com', // Cloudinary hostname
          port: '',
          pathname: '/dj2dxlequ/**', // Replace 'your-cloud-name' with your actual Cloudinary cloud name
        },
        {
          protocol: 'https',
          hostname: 'picsum.photos', // Picsum hostname
          port: '',
          pathname: '/**', // Allow all paths from Picsum
        },
      ],
  },
};

export default nextConfig;
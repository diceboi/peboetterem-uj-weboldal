/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'secure.gravatar.com',
          port: '',
          pathname: '/avatar/**',
        },
        {
          protocol: 'https',
          hostname: 'admin.peboetterem.hu',
          port: '',
          pathname: '/wp-content/**',
        },
      ],
    },
  }
  
  module.exports = nextConfig
  
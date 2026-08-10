import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cp-core-template.imgix.net',
      },
      {
        protocol: 'https',
        hostname: 'cp-core-template.s3.ap-southeast-1.amazonaws.com',
      },
    ],
  },
}

export default nextConfig

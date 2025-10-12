import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  experimental: {
    dynamicIO: true,
  },
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

  // Add webpack configuration to handle Node.js modules
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // Don't resolve 'fs' module on the client to prevent this error
      config.resolve.fallback = {
        fs: false,
        net: false,
        tls: false,
        crypto: false,
      }
    }
    return config
  },
}

export default nextConfig

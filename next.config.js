const path = require("path");
/** @type {import('next').NextConfig} */
module.exports = {
  experimental: {
    serverComponentsExternalPackages: ['llamaindex'],
    // this includes files from the monorepo base two directories up
    outputFileTracingRoot: path.join(__dirname, 'cache/'),
    outputFileTracingIncludes: {
      '/api/chat': ['./cache/**/*'],
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
        port: '',
        pathname: '**'
      }
    ]
  }
}

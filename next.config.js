/* eslint-disable */
/** @type {import('next').NextConfig} */

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});
// "https://gp6-community.s3.ap-northeast-2.amazonaws.com/
module.exports = withBundleAnalyzer({
  compress: true,
  reactStrictMode: true,
  images: {
    formats: ['image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        port: '',
        pathname: '/seed/**',
      },
      {
        protocol: 'https',
        hostname: 'gp6-community.s3.ap-northeast-2.amazonaws.com',
        port: '',
        pathname: '/images/**',
      },
    ],
  },
  webpack: (config) => {
    const isProd = process.env.NODE_ENV === 'production';
    const plugins = [...config.plugins];
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });
    return {
      ...config,
      mode: isProd ? 'production' : 'development',
      devtool: isProd ? 'hidden-source-map' : 'eval',
      plugins,
    };
  },
});

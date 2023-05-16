/* eslint-disable */
/** @type {import('next').NextConfig} */

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

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

/*
module.exports = withBundleAnalyzer({
    compress: true,
    webpack(config, {webpack}){
        const prod = process.env.NODE_ENV === 'production';
        const plugins = [...config.plugins];
        return{
            ...config,
            mode: prod ? 'producton' : 'development',
            devtool: prod ? 'hidden-source-map' : 'eval',
            plugins,
        };
    },
});


*/

// console.log(isProd);
// console.log(withBundleAnalyzer);

// const nextConfig = {
//   reactStrictMode: true,
//   images: {
//     formats: ['image/webp'],
//     remotePatterns: [
//       {
//         protocol: 'https',
//         hostname: 'picsum.photos',
//         port: '',
//         pathname: '/seed/**',
//       },
//     ],
//   },
//   webpack: (config) => {
//     config.module.rules.push({
//       test: /\.svg$/,
//       use: ['@svgr/webpack'],
//     });
//     return config;
//   },
// };

// module.exports = nextConfig;

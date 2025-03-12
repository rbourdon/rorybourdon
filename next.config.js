const withTM = require("next-transpile-modules")([
  // Add this 2 modules
  "@photo-sphere-viewer/core",
  "react-photo-sphere-viewer",
]);

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compiler: {
    styledComponents: true,
  },
  images: {
    dangerouslyAllowSVG: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "media.graphcms.com",
      },
      {
        protocol: "https",
        hostname: "media.graphassets.com",
      },
    ],
  },
  experimental: {
    workerThreads: false,
    cpus: 1,
  },
};
module.exports = withTM(nextConfig);

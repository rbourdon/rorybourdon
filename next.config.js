/** @type {import('next').NextConfig} */
module.exports = {
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
  transpilePackages: ["@photo-sphere-viewer/core", "react-photo-sphere-viewer"],
};

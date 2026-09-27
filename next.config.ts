import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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

export default nextConfig;

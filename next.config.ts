import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  reactCompiler: true,
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
        // Hygraph serves assets from regional hosts such as
        // us-east-1.graphassets.com; the old media.graphassets.com host is
        // still used by older asset URLs.
        protocol: "https",
        hostname: "**.graphassets.com",
      },
    ],
    // Next 16 only allows quality 75 unless listed here. Posts ask for 90-100;
    // 100 snaps to 90, which looks the same at a fraction of the size.
    qualities: [75, 90],
  },
  experimental: {
    workerThreads: false,
    cpus: 1,
  },
  transpilePackages: ["@photo-sphere-viewer/core", "react-photo-sphere-viewer"],
};

export default nextConfig;

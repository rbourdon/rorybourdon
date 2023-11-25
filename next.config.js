module.exports = {
  reactStrictMode: true,
  swcMinify: true,
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
    esmExternals: "loose",
  },
};

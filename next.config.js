module.exports = {
  reactStrictMode: true,
  swcMinify: true,
  compiler: {
    styledComponents: true,
  },
  images: {
    dangerouslyAllowSVG: true,
    domains: ["media.graphcms.com", "media.graphassets.com"],
  },
  experimental: {
    workerThreads: false,
    cpus: 1,
    esmExternals: "loose",
  },
};

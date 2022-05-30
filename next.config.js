module.exports = {
  reactStrictMode: true,
  swcMinify: true,
  formats: ["image/avif", "image/webp"],
  compiler: {
    styledComponents: true,
  },
  images: {
    dangerouslyAllowSVG: true,
    domains: ["media.graphcms.com", "media.graphassets.com"],
  },
};

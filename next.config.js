module.exports = {
  reactStrictMode: true,
  swcMinify: true,
  formats: ["image/avif", "image/webp"],
  images: {
    domains: ["media.graphcms.com"],
  },
  experimental: {
    // Enables the styled-components SWC transform
    styledComponents: true,
  },
};

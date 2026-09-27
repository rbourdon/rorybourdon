import type { IConfig } from "next-sitemap";

const config: IConfig = {
  siteUrl: process.env.SITE_URL || "https://rorybourdon.com",
  generateRobotsTxt: true,
};

export default config;

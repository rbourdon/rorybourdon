import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  reactCompiler: true,
  cacheComponents: true,
  // The page is the whole screen; the dev badge sits on top of the prompt.
  devIndicators: false,
  agentRules: false,
};

export default nextConfig;

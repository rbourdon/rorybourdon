import path from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  reactCompiler: true,
  cacheComponents: true,
  // The page is the whole screen; the dev badge sits on top of the prompt.
  devIndicators: false,
  agentRules: false,
  turbopack: {
    // This app lives in a folder of the old site's repository. Without this,
    // Turbopack takes the repository root for the project root.
    root: path.resolve(import.meta.dirname),
  },
};

export default nextConfig;

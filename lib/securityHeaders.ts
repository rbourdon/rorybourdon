import { createHash } from "node:crypto";
import { themeInitScript } from "./theme";

// Security headers for every response, wired up in next.config.ts.
//
// Every page is statically generated, so the Content Security Policy pins the
// one inline script (the pre-paint theme script from _document) by its hash
// rather than by a per-request nonce, which would force every page to render
// on demand. All other scripts are Next's own chunks served from 'self'.

type Env = {
  /** `next dev`: React Refresh needs eval and HMR needs a websocket. */
  isDev: boolean;
  /** Vercel preview deployments load the Vercel toolbar from vercel.live. */
  isVercelPreview: boolean;
  /**
   * next-mdx-remote turns each post's compiled MDX back into a component with
   * `new Function`. Project pages are reached by client-side navigation from
   * any page, so eval has to be allowed site-wide while it is installed.
   */
  evaluatesMdx: boolean;
};

const cmsAssetHosts = [
  "https://*.graphassets.com",
  "https://media.graphcms.com",
];

// https://vercel.com/docs/vercel-toolbar/managing-toolbar#using-a-content-security-policy
const vercelToolbar = {
  script: ["https://vercel.live"],
  connect: ["https://vercel.live", "wss://ws-us3.pusher.com"],
  img: ["https://vercel.live", "https://vercel.com"],
  frame: ["https://vercel.live"],
  font: ["https://vercel.live", "https://assets.vercel.com"],
  style: ["https://vercel.live"],
};

const themeScriptHash = `'sha256-${createHash("sha256")
  .update(themeInitScript)
  .digest("base64")}'`;

function contentSecurityPolicy({
  isDev,
  isVercelPreview,
  evaluatesMdx,
}: Env): string {
  const toolbar = (key: keyof typeof vercelToolbar) =>
    isVercelPreview ? vercelToolbar[key] : [];

  const policy: Record<string, string[]> = {
    "default-src": ["'self'"],
    "script-src": [
      "'self'",
      themeScriptHash,
      ...(isDev || evaluatesMdx ? ["'unsafe-eval'"] : []),
      ...toolbar("script"),
    ],
    // styled-components injects <style> tags and framer-motion writes inline
    // style attributes, so inline styles have to stay allowed.
    "style-src": ["'self'", "'unsafe-inline'", ...toolbar("style")],
    // blob: and data: are for the panorama viewer's textures and icons.
    "img-src": [
      "'self'",
      "blob:",
      "data:",
      ...cmsAssetHosts,
      ...toolbar("img"),
    ],
    "media-src": ["'self'", ...cmsAssetHosts],
    "font-src": ["'self'", ...toolbar("font")],
    // The panorama viewer downloads its image with fetch.
    "connect-src": [
      "'self'",
      ...cmsAssetHosts,
      ...(isDev ? ["ws:"] : []),
      ...toolbar("connect"),
    ],
    "worker-src": ["'self'", "blob:"],
    "manifest-src": ["'self'"],
    "frame-src": isVercelPreview ? toolbar("frame") : ["'none'"],
    "object-src": ["'none'"],
    "base-uri": ["'none'"],
    "form-action": ["'self'"],
    "frame-ancestors": ["'none'"],
  };

  const parts = Object.entries(policy).map(
    ([name, sources]) => `${name} ${sources.join(" ")}`,
  );
  if (!isDev) parts.push("upgrade-insecure-requests");
  return parts.join("; ");
}

export function securityHeaders(env: Env) {
  return [
    {
      source: "/:path*",
      headers: [
        { key: "Content-Security-Policy", value: contentSecurityPolicy(env) },
        // Vercel already sends HSTS on its domains; this keeps it explicit
        // and extends it to subdomains.
        {
          key: "Strict-Transport-Security",
          value: "max-age=63072000; includeSubDomains",
        },
        { key: "X-Content-Type-Options", value: "nosniff" },
        // For older browsers that ignore frame-ancestors.
        { key: "X-Frame-Options", value: "DENY" },
        { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
        {
          key: "Permissions-Policy",
          value: [
            "accelerometer=()",
            "autoplay=(self)",
            "browsing-topics=()",
            "camera=()",
            "display-capture=()",
            "fullscreen=(self)",
            "geolocation=()",
            "gyroscope=()",
            "magnetometer=()",
            "microphone=()",
            "payment=()",
            "usb=()",
          ].join(", "),
        },
      ],
    },
  ];
}

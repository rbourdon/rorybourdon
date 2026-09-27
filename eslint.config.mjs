// Must be imported first so typescript-eslint loads the TypeScript 6 API.
import "./scripts/eslint-typescript6.mjs";
import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import prettier from "eslint-config-prettier/flat";

export default defineConfig([
  ...nextVitals,
  ...nextTs,
  prettier,
  {
    // eslint-plugin-react's version auto-detection calls context.getFilename(),
    // which ESLint 10 removed, so pin the version explicitly.
    settings: { react: { version: "19.3" } },
    rules: {
      "no-useless-escape": "off",
      // New React Compiler rules from eslint-plugin-react-hooks 7. The existing
      // animation code trips them; each area is fixed as it is ported to
      // TypeScript, after which these go back to errors.
      "react-hooks/purity": "warn",
      "react-hooks/set-state-in-effect": "warn",
      "react-hooks/static-components": "warn",
    },
  },
  globalIgnores([
    ".next/**",
    "out/**",
    "build/**",
    "public/**",
    "next-env.d.ts",
  ]),
]);

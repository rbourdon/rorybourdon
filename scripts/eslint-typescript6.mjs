// TypeScript 7 ships only a CLI (no compiler API), but typescript-eslint
// still needs the TypeScript 6 API to parse .ts/.tsx files. Point every
// `typescript` import made inside the ESLint process at the side-by-side
// @typescript/typescript6 package. Nothing outside ESLint is affected.
import { registerHooks } from "node:module";

registerHooks({
  resolve(specifier, context, nextResolve) {
    if (specifier === "typescript") {
      return nextResolve("@typescript/typescript6", context);
    }
    return nextResolve(specifier, context);
  },
});

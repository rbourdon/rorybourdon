import "styled-components";
import type { MotionValue } from "framer-motion";
import type { ThemeColorName } from "@/lib/theme";

/** Theme colours are motion values so a theme switch can animate them. */
export type ThemeColors = Record<ThemeColorName, MotionValue<string>>;

declare module "styled-components" {
  export interface DefaultTheme extends ThemeColors {}
}

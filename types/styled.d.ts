import "styled-components";
import type { MotionValue } from "framer-motion";

/** Theme colours are motion values so a theme switch can animate them. */
export interface ThemeColors {
  name: MotionValue<string>;
  primary_superdark: MotionValue<string>;
  primary_verydark: MotionValue<string>;
  primary_dark: MotionValue<string>;
  primary_mediumdark: MotionValue<string>;
  primary_slightlydark: MotionValue<string>;
  primary: MotionValue<string>;
  primary_light: MotionValue<string>;
  primary_verylight: MotionValue<string>;
  yellow: MotionValue<string>;
  green: MotionValue<string>;
  teal: MotionValue<string>;
  orange: MotionValue<string>;
  blue: MotionValue<string>;
  purple: MotionValue<string>;
  red: MotionValue<string>;
  shadow_key: MotionValue<string>;
  shadow_ambient: MotionValue<string>;
}

declare module "styled-components" {
  export interface DefaultTheme extends ThemeColors {}
}

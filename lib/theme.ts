// The one source of truth for the site palette. It feeds the CSS custom
// properties (var(--color-*)) used in styled-components templates and the
// animated theme motion values read through useTheme().
//
// Light and dark are currently identical: dark mode is wired up but has no
// palette of its own yet.

const light = {
  name: "light",
  primary_superdark: "hsla(266.67, 5.89%, 18.63%, 1)",
  primary_verydark: "hsla(266.67, 6.89%, 28.63%, 1)",
  primary_dark: "hsla(270, 5.89%, 40.71%, 1)",
  primary_mediumdark: "hsla(270, 4.74%, 55.88%, 1)",
  primary_slightlydark: "hsla(270, 8.74%, 75.88%, 1)",
  primary: "hsla(270, 8.74%, 85.88%, 1)",
  primary_light: "hsla(270, 8.64%, 88.52%, 1)",
  primary_verylight: "hsla(270, 8.64%, 91%, 1)",
  yellow: "hsla(57.71, 43.12%, 60.08%, 1)",
  green: "hsla(77, 55.36%, 55.2%, 1)",
  teal: "hsla(179, 45.6%, 50.37%, 1)",
  orange: "hsl(348, 61.7%, 55.61%, 1)",
  blue: "hsla(209.16, 52.72%, 47.98%, 1)",
  purple: "hsla(298.33, 36.78%, 55.98%, 1)",
  red: "hsla(351.89, 42.07%, 47.02%, 1)",
  shadow_key: "hsla(270, 36%, 10%, 0.15)",
  shadow_ambient: "hsla(270, 36%, 10%, 0.1)",
};

export type ThemeColorName = keyof typeof light;
export type Palette = Record<ThemeColorName, string>;

export const palettes = {
  light,
  dark: { ...light, name: "dark" },
} satisfies Record<string, Palette>;

export type ThemeMode = keyof typeof palettes;

export const themeColorNames = Object.keys(light) as ThemeColorName[];

export function isThemeMode(value: unknown): value is ThemeMode {
  return value === "light" || value === "dark";
}

/** The palette as CSS custom properties, e.g. { "--color-primary": "hsla(…)" }. */
export function paletteCssVars(palette: Palette): Record<string, string> {
  return Object.fromEntries(
    themeColorNames.map((key) => [`--color-${key}`, palette[key]]),
  );
}

export function applyPaletteCssVars(palette: Palette) {
  const root = document.documentElement;
  for (const [property, value] of Object.entries(paletteCssVars(palette))) {
    root.style.setProperty(property, value);
  }
}

/**
 * Inline script for _document that sets the saved (or system) theme's CSS
 * variables before first paint, so the page never flashes the wrong palette.
 */
export const themeInitScript = `(function () {
  var vars = ${JSON.stringify({
    light: paletteCssVars(palettes.light),
    dark: paletteCssVars(palettes.dark),
  })};
  try {
    var mode = localStorage.getItem("theme");
    if (mode !== "light" && mode !== "dark") {
      mode = window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
    }
    localStorage.setItem("theme", mode);
    var root = document.documentElement;
    for (var key in vars[mode]) root.style.setProperty(key, vars[mode][key]);
  } catch (err) {
    console.log(new Error("accessing theme has been denied"));
  }
})();`;

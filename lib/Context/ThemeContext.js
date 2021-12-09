import {
  useState,
  useContext,
  createContext,
  useEffect,
  useCallback,
} from "react";
import { ThemeProvider } from "styled-components";
import theme from "@/lib/Context/ThemePicker";
import { animate, useMotionValue } from "framer-motion";

const StateContext = createContext();
const DispatchContext = createContext();

const setCSS = () => {
  var currentTheme;
  function changeTheme(inputTheme) {
    if (inputTheme === "dark") {
      const theme = themeConfig.dark;
      for (let key in theme) {
        setCSSVar(key, theme[key]);
      }

      localStorage.setItem("theme", inputTheme);
    } else {
      const theme = themeConfig.light;
      for (let key in theme) {
        setCSSVar(key, theme[key]);
      }
      localStorage.setItem("theme", inputTheme);
    }
  }

  function setCSSVar(property, color) {
    document.documentElement.style.setProperty(property, color);
  }
  try {
    currentTheme = localStorage.getItem("theme") || "light";
    var themeConfig = {
      dark: {
        "--color-name": "dark",
        "--color-primary_superdark": "hsla(266.67, 5.89%, 18.63%, 1)",
        "--color-primary_verydark": "hsla(266.67, 6.89%, 28.63%, 1)",
        "--color-primary_dark": "hsla(270, 5.89%, 40.71%, 1)",
        "--color-primary_mediumdark": "hsla(270, 4.74%, 55.88%, 1)",
        "--color-primary_slightlydark": "hsla(270, 8.74%, 75.88%, 1)",
        "--color-primary": "hsla(270, 8.74%, 85.88%, 1)",
        "--color-primary_light": "hsla(270, 8.64%, 88.52%, 1)",
        "--color-primary_verylight": "hsla(270, 8.64%, 91%, 1)",
        "--color-yellow": "hsla(57.71, 43.12%, 60.08%, 1)",
        "--color-green": "hsla(77, 55.36%, 55.2%, 1)",
        "--color-teal": "hsla(179, 45.6%, 50.37%, 1)",
        "--color-orange": "hsl(348, 61.7%, 55.61%, 1)",
        "--color-blue": "hsla(209.16, 52.72%, 47.98%, 1)",
        "--color-purple": "hsla(298.33, 36.78%, 55.98%, 1)",
        "--color-red": "hsla(351.89, 42.07%, 47.02%, 1)",
        "--color-shadow_key": "hsla(270, 6%, 10%, 0.5)",
        "--color-shadow_ambient": "hsla(270, 6%, 10%, 0.3)",
      },
      light: {
        "--color-name": "light",
        "--color-primary_superdark": "hsla(266.67, 5.89%, 18.63%, 1)",
        "--color-primary_verydark": "hsla(266.67, 6.89%, 28.63%, 1)",
        "--color-primary_dark": "hsla(270, 5.89%, 40.71%, 1)",
        "--color-primary_mediumdark": "hsla(270, 4.74%, 55.88%, 1)",
        "--color-primary_slightlydark": "hsla(270, 8.74%, 75.88%, 1)",
        "--color-primary": "hsla(270, 8.74%, 85.88%, 1)",
        "--color-primary_light": "hsla(270, 8.64%, 88.52%, 1)",
        "--color-primary_verylight": "hsla(270, 8.64%, 91%, 1)",
        "--color-yellow": "hsla(57.71, 43.12%, 60.08%, 1)",
        "--color-green": "hsla(77, 55.36%, 55.2%, 1)",
        "--color-teal": "hsla(179, 45.6%, 50.37%, 1)",
        "--color-orange": "hsl(348, 61.7%, 55.61%, 1)",
        "--color-blue": "hsla(209.16, 52.72%, 47.98%, 1)",
        "--color-purple": "hsla(298.33, 36.78%, 55.98%, 1)",
        "--color-red": "hsla(351.89, 42.07%, 47.02%, 1)",
        "--color-shadow_key": "hsla(270, 6%, 10%, 0.15)",
        "--color-shadow_ambient": "hsla(270, 6%, 10%, 0.1)",
      },
    };

    changeTheme(currentTheme);
  } catch (err) {
    console.log(new Error("accessing theme has been denied"));
  }
  return currentTheme;
};

export const ThemeControlProvider = ({ children }) => {
  const [mode, setMode] = useState(undefined);
  const name = useMotionValue(!mode ? "var(--color-name)" : theme[mode].name);
  const primary_superdark = useMotionValue("var(--color-primary_superdark)");
  const primary_verydark = useMotionValue("var(--color-primary_verydark)");
  const primary_dark = useMotionValue("var(--color-primary_dark)");
  const primary_mediumdark = useMotionValue("var(--color-primary_mediumdark)");
  const primary_slightlydark = useMotionValue(
    "var(--color-primary_slightlydark)"
  );
  const primary = useMotionValue("var(--color-primary)");
  const primary_light = useMotionValue("var(--color-primary_light)");
  const primary_verylight = useMotionValue("var(--color-primary_verylight)");
  const yellow = useMotionValue("var(--color-yellow)");
  const green = useMotionValue("var(--color-green)");
  const teal = useMotionValue("var(--color-teal)");
  const orange = useMotionValue("var(--color-orange)");
  const blue = useMotionValue("var(--color-blue)");
  const purple = useMotionValue("var(--color-purple)");
  const red = useMotionValue("var(--color-red)");
  const shadow_key = useMotionValue("var(--color-shadow_key)");
  const shadow_ambient = useMotionValue("var(--color-shadow_ambient)");

  const updateMode = useCallback(
    (m) => {
      setMode(m);
      localStorage.setItem("theme", m);
      setCSS();
      if (!mode) {
        name.set(theme[m].name);
        primary_superdark.set(theme[m].primary_superdark);
        primary_verydark.set(theme[m].primary_verydark);
        primary_dark.set(theme[m].primary_dark);
        primary_mediumdark.set(theme[m].primary_mediumdark);
        primary_slightlydark.set(theme[m].primary_slightlydark);
        primary.set(theme[m].primary);
        primary_light.set(theme[m].primary_light);
        primary_verylight.set(theme[m].primary_verylight);
        yellow.set(theme[m].yellow);
        green.set(theme[m].green);
        teal.set(theme[m].teal);
        orange.set(theme[m].orange);
        blue.set(theme[m].blue);
        purple.set(theme[m].purple);
        red.set(theme[m].red);
        shadow_key.set(theme[m].shadow_key);
        shadow_ambient.set(theme[m].shadow_ambient);
      }
    },
    [
      blue,
      green,
      mode,
      name,
      primary,
      primary_slightlydark,
      primary_mediumdark,
      primary_dark,
      primary_light,
      primary_verylight,
      primary_verydark,
      primary_superdark,
      purple,
      red,
      shadow_ambient,
      shadow_key,
      teal,
      orange,
      yellow,
    ]
  );

  useEffect(() => {
    const savedMode = localStorage.getItem("theme");
    savedMode ? updateMode(savedMode) : updateMode("light");
  }, [updateMode]);

  const toggleMode = () => {
    mode === "light" ? updateMode("dark") : updateMode("light");
  };

  useEffect(() => {
    if (mode) {
      name.set(theme[mode].name);
      animate(primary_superdark, theme[mode].primary_superdark, {
        type: "tween",
      });
      animate(primary_verydark, theme[mode].primary_verydark, {
        type: "tween",
      });
      animate(primary_dark, theme[mode].primary_dark, {
        type: "tween",
      });
      animate(primary_mediumdark, theme[mode].primary_mediumdark, {
        type: "tween",
      });
      animate(primary_slightlydark, theme[mode].primary_slightlydark, {
        type: "tween",
      });
      animate(primary, theme[mode].primary, {
        type: "tween",
      });
      animate(primary_light, theme[mode].primary_light, {
        type: "tween",
      });
      animate(primary_verylight, theme[mode].primary_verylight, {
        type: "tween",
      });
      animate(yellow, theme[mode].yellow, {
        type: "tween",
      });
      animate(green, theme[mode].green, {
        type: "tween",
      });
      animate(teal, theme[mode].teal, {
        type: "tween",
      });
      animate(orange, theme[mode].orange, {
        type: "tween",
      });
      animate(blue, theme[mode].blue, {
        type: "tween",
      });
      animate(purple, theme[mode].purple, {
        type: "tween",
      });
      animate(red, theme[mode].red, {
        type: "tween",
      });
      animate(shadow_key, theme[mode].shadow_key, {
        type: "tween",
      });
      animate(shadow_ambient, theme[mode].shadow_ambient, {
        type: "tween",
      });
    }
  }, [
    mode,
    name,
    primary_verylight,
    primary_light,
    primary,
    primary_slightlydark,
    primary_mediumdark,
    primary_dark,
    primary_verydark,
    primary_superdark,
    blue,
    green,
    purple,
    red,
    shadow_ambient,
    shadow_key,
    teal,
    orange,
    yellow,
  ]);

  return (
    <DispatchContext.Provider
      value={{
        toggleMode: toggleMode,
      }}
    >
      <ThemeProvider
        theme={{
          name: name,
          primary_superdark: primary_superdark,
          primary_verydark: primary_verydark,
          primary_dark: primary_dark,
          primary_mediumdark: primary_mediumdark,
          primary_slightlydark: primary_slightlydark,
          primary: primary,
          primary_light: primary_light,
          primary_verylight: primary_verylight,
          yellow: yellow,
          teal: teal,
          orange: orange,
          green: green,
          purple: purple,
          red: red,
          blue: blue,
          shadow_key: shadow_key,
          shadow_ambient: shadow_ambient,
        }}
      >
        {children}
      </ThemeProvider>
    </DispatchContext.Provider>
  );
};

export const useThemeModeState = () => useContext(StateContext);
export const useThemeMode = () => useContext(DispatchContext);

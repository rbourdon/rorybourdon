import {
  useState,
  useContext,
  createContext,
  useEffect,
  useCallback,
} from "react";
import { ThemeProvider } from "styled-components";
import theme from "@/components/ThemePicker";
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
        "--color-primary_verydark": "hsla(266.67, 2.89%, 28.63%, 1)",
        "--color-primary_dark": "hsla(266.67, 7.89%, 38.71%, 1)",
        "--color-primary_mediumdark": "hsla(270, 8.74%, 55.88%, 1)",
        "--color-primary_slightlydark": "hsla(270, 8.74%, 75.88%, 1)",
        "--color-primary": "hsla(270, 8.74%, 85.88%, 1)",
        // "--color-primary_med": "hsla(285, 6%, 14%, 1)",
        "--color-primary_light": "hsla(280, 2.64%, 89.02%, 1)",
        // "--color-primary_verylight": "hsla(276, 6.5%, 19.5%, 1)",
        "--color-yellow": "hsla(57.71, 43.12%, 60.08%, 1)",
        "--color-green": "hsla(84, 40.2%, 47.8%, 1)",
        "--color-teal": "hsla(188, 48.8%, 51%, 1)",
        "--color-orange": "hsl(10, 66%, 60%, 1)",
        "--color-blue": "hsla(209.16, 52.72%, 47.98%, 1)",
        "--color-purple": "hsla(298.33, 36.78%, 55.98%, 1)",
        "--color-red": "hsla(351.89, 42.07%, 47.02%, 1)",
        "--color-shadow_key": "hsla(270, 6%, 10%, 0.5)",
        "--color-shadow_ambient": "hsla(270, 6%, 10%, 0.3)",
        // "--color-fmgBox_shadow": "hsla(270, 20%, 2%, 1)",
        // "--color-em": "hsla(284, 100%, 97%, 1)",
        // "--filter-fmgBox": "saturate(140%) brightness(65%)",
        // "--filter-product": "brightness(90%)",
        // "--filter-icon": "brightness(255%) saturate(50%)",
        // "--filter-social": "brightness(150%)",
        // "--filter-socialHover": "brightness(220%)",
        // "--theme-toggle-rotation": "0deg",
        // "--icon-sun-opacity": "1",
        // "--icon-moon-opacity": "0",
      },
      light: {
        "--color-name": "light",
        "--color-primary_verydark": "hsla(266.67, 2.89%, 28.63%, 1)",
        "--color-primary_dark": "hsla(266.67, 7.89%, 38.71%, 1)",
        "--color-primary_mediumdark": "hsla(270, 8.74%, 55.88%, 1)",
        "--color-primary_slightlydark": "hsla(270, 8.74%, 75.88%, 1)",
        "--color-primary": "hsla(270, 8.74%, 85.88%, 1)",
        // "--color-primary_med": "hsla(280, 17%, 93%, 1)",
        "--color-primary_light": "hsla(280, 2.64%, 89.02%, 1)",
        // "--color-primary_verylight": "hsla(280, 30%, 96%, 1)",
        "--color-yellow": "hsla(57.71, 43.12%, 60.08%, 1)",
        "--color-green": "hsla(84, 40.2%, 47.8%, 1)",
        "--color-teal": "hsla(188, 48.8%, 51%, 1)",
        "--color-orange": "hsl(10, 66%, 60%, 1)",
        "--color-blue": "hsla(209.16, 52.72%, 47.98%, 1)",
        "--color-purple": "hsla(298.33, 36.78%, 55.98%, 1)",
        "--color-red": "hsla(351.89, 42.07%, 47.02%, 1)",
        "--color-shadow_key": "hsla(270, 6%, 10%, 0.15)",
        "--color-shadow_ambient": "hsla(270, 6%, 10%, 0.1)",
        // "--color-fmgBox_shadow": "hsla(283, 16%, 29%, 1)",
        // "--color-em": "hsla(282, 24%, 45%, 1)",
        // "--filter-fmgBox": "saturate(100%) brightness(100%)",
        // "--filter-product": "brightness(99%)",
        // "--filter-icon": "brightness(100%) saturate(100%)",
        // "--filter-social": "brightness(100%)",
        // "--filter-socialHover": "brightness(155%)",
        // "--theme-toggle-rotation": "270deg",
        // "--icon-sun-opacity": "0",
        // "--icon-moon-opacity": "1",
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
  const primary_verydark = useMotionValue("var(--color-primary_verydark)");
  const primary_dark = useMotionValue("var(--color-primary_dark)");
  const primary_mediumdark = useMotionValue("var(--color-primary_mediumdark)");
  const primary_slightlydark = useMotionValue(
    "var(--color-primary_slightlydark)"
  );
  const primary = useMotionValue("var(--color-primary)");
  const primary_light = useMotionValue("var(--color-primary_light)");
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
        primary_verydark.set(theme[m].primary_verydark);
        primary_dark.set(theme[m].primary_dark);
        primary_mediumdark.set(theme[m].primary_mediumdark);
        primary_slightlydark.set(theme[m].primary_slightlydark);
        primary.set(theme[m].primary);
        primary_light.set(theme[m].primary_light);
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
      primary_verydark,
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
      // animate(primary_med, theme[mode].primary_med, {
      //   type: "tween",
      // });
      animate(primary_light, theme[mode].primary_light, {
        type: "tween",
      });
      // animate(primary_verylight, theme[mode].primary_verylight, {
      //   type: "tween",
      // });
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
      // animate(fmgBox_shadow, theme[mode].fmgBox_shadow, {
      //   type: "tween",
      // });
      // animate(em, theme[mode].em, {
      //   type: "tween",
      // });
      // animate(filter_fmgBox, theme[mode].filter_fmgBox, {
      //   type: "tween",
      // });
      // animate(filter_product, theme[mode].filter_product, {
      //   type: "tween",
      // });
      // animate(filter_icon, theme[mode].filter_icon, {
      //   type: "tween",
      // });
      // animate(filter_social, theme[mode].filter_social, {
      //   type: "tween",
      // });
      // animate(filter_socialHover, theme[mode].filter_socialHover, {
      //   type: "tween",
      // });
      // animate(toggle_rotate, theme[mode].toggle_rotate, {
      //   type: "tween",
      // });
      // animate(sun_opacity, theme[mode].sun_opacity, {
      //   type: "tween",
      // });
      // animate(moon_opacity, theme[mode].moon_opacity, {
      //   type: "tween",
      // });
    }
  }, [
    mode,
    name,
    primary_light,
    primary,
    primary_slightlydark,
    primary_mediumdark,
    primary_dark,
    primary_verydark,
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
          primary_verydark: primary_verydark,
          primary_dark: primary_dark,
          primary_mediumdark: primary_mediumdark,
          primary_slightlydark: primary_slightlydark,
          primary: primary,
          // primary_med: primary_med,
          primary_light: primary_light,
          // primary_verylight: primary_verylight,
          yellow: yellow,
          teal: teal,
          orange: orange,
          green: green,
          purple: purple,
          red: red,
          blue: blue,
          shadow_key: shadow_key,
          shadow_ambient: shadow_ambient,
          // fmgBox_shadow: fmgBox_shadow,
          // em: em,
          // filter_fmgBox: filter_fmgBox,
          // filter_product: filter_product,
          // filter_icon: filter_icon,
          // filter_social: filter_social,
          // filter_socialHover: filter_socialHover,
          // toggle_rotate: toggle_rotate,
          // sun_opacity: sun_opacity,
          // moon_opacity: moon_opacity,
        }}
      >
        {children}
      </ThemeProvider>
    </DispatchContext.Provider>
  );
};

export const useThemeModeState = () => useContext(StateContext);
export const useThemeMode = () => useContext(DispatchContext);

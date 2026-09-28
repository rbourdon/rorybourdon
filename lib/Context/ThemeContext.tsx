import { animate, motionValue } from "framer-motion";
import {
  createContext,
  type ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { type DefaultTheme, ThemeProvider } from "styled-components";
import {
  applyPaletteCssVars,
  isThemeMode,
  palettes,
  type ThemeMode,
  themeColorNames,
} from "@/lib/theme";

const StateContext = createContext<ThemeMode | undefined>(undefined);
const DispatchContext = createContext<{ toggleMode: () => void } | undefined>(
  undefined,
);

// Motion values start from real colours rather than var(--color-*) strings:
// framer-motion can't interpolate a var(), so animations that began before the
// theme loaded used to jump instead of animating.
function createThemeValues(): DefaultTheme {
  const values: Partial<DefaultTheme> = {};
  for (const key of themeColorNames) {
    values[key] = motionValue(palettes.light[key]);
  }
  return values as DefaultTheme;
}

export const ThemeControlProvider = ({ children }: { children: ReactNode }) => {
  const [mode, setMode] = useState<ThemeMode | undefined>(undefined);
  const [theme] = useState(createThemeValues);

  // Pick up the mode the _document script chose before first paint.
  useEffect(() => {
    const saved = localStorage.getItem("theme");
    const initial = isThemeMode(saved) ? saved : "light";
    for (const key of themeColorNames) {
      theme[key].set(palettes[initial][key]);
    }
    setMode(initial);
  }, [theme]);

  const toggleMode = useCallback(() => {
    const next: ThemeMode = mode === "light" ? "dark" : "light";
    localStorage.setItem("theme", next);
    applyPaletteCssVars(palettes[next]);
    theme.name.set(next);
    for (const key of themeColorNames) {
      if (key !== "name") {
        animate(theme[key], palettes[next][key], {
          type: "tween",
        });
      }
    }
    setMode(next);
  }, [mode, theme]);

  const dispatch = useMemo(() => ({ toggleMode }), [toggleMode]);

  return (
    <DispatchContext.Provider value={dispatch}>
      <StateContext.Provider value={mode}>
        <ThemeProvider theme={theme}>{children}</ThemeProvider>
      </StateContext.Provider>
    </DispatchContext.Provider>
  );
};

export const useThemeModeState = () => useContext(StateContext);
export const useThemeMode = () => useContext(DispatchContext);

import Head from "next/head";
import { ThemeContext } from "styled-components";
import { motion } from "framer-motion";
import { useContext } from "react";

function Layout({ children }) {
  const theme = useContext(ThemeContext);

  return (
    <motion.div
      style={{
        backgroundColor: theme.primary_light,
        overflow: "hidden",
        width: "100%",
      }}
    >
      <Head>
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
        <meta name="msapplication-TileColor" content="#00aba9" />
        <meta name="theme-color" content="#ffffff" />

        <meta name="author" content="Rory Bourdon" />
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
            (function () {
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
                const sysDark = window.matchMedia('(prefers-color-scheme: dark)').matches === true;
                const savedTheme = localStorage.getItem("theme");
                if (savedTheme) {
                  currentTheme = savedTheme;
                }
                else if (sysDark)
                {
                  currentTheme = "dark";
                }
                else
                {
                  currentTheme = "light";
                }
                
                var themeConfig = {
                  dark: {
                    "--color-name": "dark",                  
                    "--color-primary": "hsla(270, 8.74%, 85.88%, 1)",
                    "--color-primary_verylight": "hsla(hsla(270, 8.64%, 91%, 1))",
                    "--color-primary_light": "hsla(270, 8.64%, 88.52%, 1)",
                    "--color-primary_superdark": "hsla(266.67, 5.89%, 18.63%, 1)",
                    "--color-primary_verydark": "hsla(266.67, 6.89%, 28.63%, 1)",
                    "--color-primary_mediumdark": "hsla(270, 4.74%, 55.88%, 1)",
                    "--color-primary_slightlydark": "hsla(270, 8.74%, 75.88%, 1)",
                    "--color-primary_dark": "hsla(270, 5.89%, 40.71%, 1)",
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
                    "--color-primary": "hsla(270, 8.74%, 85.88%, 1)",
                    "--color-primary_verylight": "hsla(hsla(270, 8.64%, 91%, 1))",
                    "--color-primary_light": "hsla(270, 8.64%, 88.52%, 1)",
                    "--color-primary_superdark": "hsla(266.67, 5.89%, 18.63%, 1)",
                    "--color-primary_verydark": "hsla(266.67, 6.89%, 28.63%, 1)",
                    "--color-primary_mediumdark": "hsla(270, 4.74%, 55.88%, 1)",
                    "--color-primary_slightlydark": "hsla(270, 8.74%, 75.88%, 1)",
                    "--color-primary_dark": "hsla(270, 5.89%, 40.71%, 1)",
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
            })();
            `,
          }}
        />
      </Head>
      {children}
    </motion.div>
  );
}

export default Layout;

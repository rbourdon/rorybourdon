import Head from "next/head";
import styled, { ThemeContext } from "styled-components";
import { motion } from "framer-motion";
import { useContext } from "react";

const Container = styled(motion.div)`
  width: 100%;
  min-height: 100vh;
  max-width: 100%;
  background-color: var(--color-primary);
  overflow: hidden;
`;

function Layout({ children }) {
  const theme = useContext(ThemeContext);

  return (
    <Container style={{ backgroundColor: theme.primary_light }}>
      <Head>
        <link rel="stylesheet" href="https://use.typekit.net/ekd5pcq.css" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="mask-icon" href="/favicon.ico" color="#FFFFFF" />
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
                    "--color-primary_light": "hsla(280, 2.64%, 89.02%, 1)",
                    "--color-primary_verydark": "hsla(0, 0%, 28.63%, 1)",
                    "--color-primary_mediumdark": "hsla(270, 8.74%, 55.88%, 1)",
                    "--color-primary_dark": "hsla(266.67, 7.89%, 38.71%, 1)",
                    "--color-yellow": "hsla(57.71, 43.12%, 60.08%, 1)",
                    "--color-green": "hsla(83.88, 42.31%, 57.06%, 1)",
                    "--color-teal": "hsla(188, 48.8%, 51%, 1)",
                    "--color-orange": "hsl(10, 66%, 60%, 1)",
                    "--color-blue": "hsla(209.16, 52.72%, 47.98%, 1)",
                    "--color-purple": "hsla(298.33, 36.78%, 55.98%, 1)",
                    "--color-red": "hsla(351.89, 42.07%, 47.02%, 1)",
                    "--color-shadow_key": "hsla(270, 6%, 10%, 0.5)",
                    "--color-shadow_ambient": "hsla(270, 6%, 10%, 0.3)",
                  },
                  light: {
                    "--color-name": "light",
                    "--color-primary": "hsla(270, 8.74%, 85.88%, 1)",
                    "--color-primary_light": "hsla(280, 2.64%, 89.02%, 1)",
                    "--color-primary_verydark": "hsla(0, 0%, 28.63%, 1)",
                    "--color-primary_mediumdark": "hsla(270, 8.74%, 55.88%, 1)",
                    "--color-primary_dark": "hsla(266.67, 7.89%, 38.71%, 1)",
                    "--color-yellow": "hsla(57.71, 43.12%, 60.08%, 1)",
                    "--color-green": "hsla(83.88, 42.31%, 57.06%, 1)",
                    "--color-teal": "hsla(188, 48.8%, 51%, 1)",
                    "--color-orange": "hsl(10, 66%, 60%, 1)",
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
    </Container>
  );
}

export default Layout;

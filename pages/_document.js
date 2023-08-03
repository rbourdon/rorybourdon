import Document, { Html, Head, Main, NextScript } from "next/document";
import Script from "next/script";
import { ServerStyleSheet } from "styled-components";

export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) =>
            sheet.collectStyles(<App {...props} />),
        });

      const initialProps = await Document.getInitialProps(ctx);
      return {
        ...initialProps,
        styles: [initialProps.styles, sheet.getStyleElement()],
      };
    } finally {
      sheet.seal();
    }
  }
  render() {
    return (
      <Html>
        <Head />
        <body>
          <Script
            id="theme-script"
            strategy="beforeInteractive"
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
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

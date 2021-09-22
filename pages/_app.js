import { AnimatePresence } from "framer-motion";
import { createGlobalStyle } from "styled-components";
import { ThemeControlProvider } from "@/lib/ThemeContext";

const GlobalStyle = createGlobalStyle`
  html {
    scrollbar-width: thin;
      scrollbar-color: var(--color-purple_light) var(--color-primary_verylight);

      &::-webkit-scrollbar {
        width: 9px;
      }
      
      &::-webkit-scrollbar-track {
        background: var(--color-primary_verylight);
      }

      &::-webkit-scrollbar-thumb {
        background-color: var(--color-purple_light);
      }

      &::-webkit-scrollbar-thumb:hover {
        background-color: var(--color-purple_med);
      }
  }
  body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-size: 1rem;
    font-weight: 100;
    font-style: normal;
    font-family:  proxima-nova, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif;
    color: hsla(0,0%,28.63%,1);
  a {
    color: inherit;
    text-decoration: none;
  }
  *
  {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    box-sizing: border-box;
    z-index: 1;
  }
  p {
    margin: 0;
    font-size: clamp(1rem, .85vw, 1.3rem);
    font-weight: 100;
  }
  em {
    font-style: normal;
    color: var(--color-em);
    font-weight: 100;
  }
  figure {
    margin: 0;
  }
  figcaption {
    margin: 0;
  }
  header {
    font-size: clamp(3.0rem, 6vw, 5.438rem);
    line-height: 1;
  }
  h1 {
    margin: 0;
    font-size: clamp(3.0rem, 6vw, 6.538rem);
    line-height: 1;
    font-weight: 100;
  }
  h2 {
    font-size: clamp(3.5rem, 6vw, 5rem);
    margin: 0;
    font-weight: 100;
  }
  h3 {
    margin: 0;
    font-size: clamp(1.15rem, 1.66vw, 1.625rem);
    line-height: 1.1;
    font-weight: 100;
  }
  h4 {
    font-size: 1rem;
    margin: 0 0 4px 0;
    line-height: 1;
    font-weight: 100;
  }
`;

// function handleExitComplete() {
//   if (typeof window !== "undefined") {
//     window.scrollTo(0, 0);
//   }
// }

function MyApp({ Component, pageProps, router }) {
  return (
    <ThemeControlProvider>
      <GlobalStyle />

      <AnimatePresence
        exitBeforeEnter
        //onExitComplete={() => handleExitComplete()}
      >
        <Component {...pageProps} key={router.route} />
      </AnimatePresence>
    </ThemeControlProvider>
  );
}

export default MyApp;

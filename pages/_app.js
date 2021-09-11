import { AnimatePresence, AnimateSharedLayout } from "framer-motion";
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
  input:autofill,
  input:autofill:hover, 
  input:autofill:focus,
  textarea:autofill,
  textarea:autofill:hover,
  textarea:autofill:focus,
  select:autofill,
  select:autofill:hover,
  select:autofill:focus {
    filter: none;
    outline: none;
    -webkit-text-fill-color: var(--color-purple_light);
    box-shadow: 0 0 0 100px var(--color-primary_med) inset;
    border: 0.13rem solid var(--color-purple_light);
  }

  input:-webkit-autofill,
  input:-webkit-autofill:hover, 
  input:-webkit-autofill:focus,
  textarea:-webkit-autofill,
  textarea:-webkit-autofill:hover,
  textarea:-webkit-autofill:focus,
  select:-webkit-autofill,
  select:-webkit-autofill:hover,
  select:-webkit-autofill:focus {
    outline: none;
    -webkit-text-fill-color: var(--color-purple_light);
    box-shadow: 0 0 0 100px var(--color-primary_med) inset;
    border: 0.13rem solid var(--color-purple_light);
  }
`;

function handleExitComplete() {
  if (typeof window !== "undefined") {
    window.scrollTo(0, 0);
  }
}

function MyApp({ Component, pageProps, router }) {
  return (
    <ThemeControlProvider>
      <GlobalStyle />
      <AnimateSharedLayout>
        <AnimatePresence
          exitBeforeEnter
          onExitComplete={() => handleExitComplete()}
        >
          <Component {...pageProps} key={router.route} />
        </AnimatePresence>
      </AnimateSharedLayout>
    </ThemeControlProvider>
  );
}

export default MyApp;

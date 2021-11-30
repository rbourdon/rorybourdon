import { AnimatePresence } from "framer-motion";
import { createGlobalStyle } from "styled-components";
import { ThemeControlProvider } from "@/lib/Context/ThemeContext";
import Layout from "@/components/layout";

const GlobalStyle = createGlobalStyle`
html {
    scrollbar-width: thin;
    scrollbar-color: var(--color-primary) var(--color-primary_slightlydark);

    &::-webkit-scrollbar {
      width: 10px;
    }

    &::-webkit-scrollbar-track {
      background: var(--color-primary);
    }

    &::-webkit-scrollbar-thumb {
      background-color: var(--color-primary_slightlydark);
    }

    &::-webkit-scrollbar-thumb:hover {
      background-color: var(--color-primary_mediumdark);
    }
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    scroll-behavior: smooth;
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
  }
  a {
    color: inherit;
    text-decoration: none;
  }
  *
  {
    box-sizing: border-box;
  }
    button, input[type="submit"], input[type="reset"] {
      background: none;
      color: inherit;
      border: none;
      padding: 0;
      font: inherit;
      cursor: pointer;
      outline: inherit;
    }
  p {
    margin: 0;
    font-size: clamp(1rem, .85vw, 1.3rem);
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
    font-size: clamp(2.5rem, 11vw, 8.5rem);
    line-height: 1;
    font-weight: 100;
  }
  h2 {
    font-size: clamp(1.2rem, 4.5vw, 1.7rem);
    line-height: clamp(1.2rem, 7vw, 2rem);
    margin: 0;
    font-weight: 100;
  }
  h3 {
    margin: 0;
    font-size: clamp(1.15rem, 1.66vw, 1.425rem);
    line-height: clamp(1.25rem, 1.66vw, 1.8rem);
    font-weight: 100;
  }
  h4 {
    font-size: 1rem;
    margin: 0 0 4px 0;
    line-height: 1;
    font-weight: 100;
  }
  
`;

function handleExitComplete() {
  if (typeof window !== "undefined") {
    window.scrollTo({ top: 0, left: 0 });
  }
}

function MyApp({ Component, pageProps, router }) {
  return (
    <ThemeControlProvider>
      <GlobalStyle />
      <Layout>
        <AnimatePresence
          exitBeforeEnter
          onExitComplete={() => handleExitComplete()}
        >
          <Component {...pageProps} key={router.route} />
        </AnimatePresence>
      </Layout>
    </ThemeControlProvider>
  );
}

export default MyApp;

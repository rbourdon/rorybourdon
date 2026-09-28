import Document, {
  type DocumentContext,
  Head,
  Html,
  Main,
  NextScript,
} from "next/document";
import Script from "next/script";
import { ServerStyleSheet } from "styled-components";
import { themeInitScript } from "@/lib/theme";

export default class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
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
            // biome-ignore lint/security/noDangerouslySetInnerHtml: static inline script that applies the saved theme before first paint
            dangerouslySetInnerHTML={{ __html: themeInitScript }}
          />
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

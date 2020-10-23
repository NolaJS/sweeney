import Document, { Html, Head, Main, NextScript } from 'next/document';
import { SheetsRegistry, JssProvider, createGenerateId } from 'react-jss';

export default class JssDocument extends Document {
  static async getInitialProps(ctx) {
    const registry = new SheetsRegistry();
    const generateId = createGenerateId();
    const originalRenderPage = ctx.renderPage;
    ctx.renderPage = () =>
      originalRenderPage({
        enhanceApp: App => props => (
          <JssProvider registry={registry} generateId={generateId}>
            <App {...props} />
          </JssProvider>
        ),
      });

    const initialProps = await Document.getInitialProps(ctx);

    return {
      ...initialProps,
      styles: (
        <>
          {initialProps.styles}
          <style id="server-side-styles">{registry.toString()}</style>
        </>
      ),
    };
  }

  render() {
    return (
      <Html>
        <Head>
          <link
            href="https://fonts.googleapis.com/css2?family=Anton&family=Roboto:wght@400;700&display=swap"
            rel="stylesheet"
          />
          <link rel="apple-touch-icon" sizes="180x180" href="favicon-imgs/apple-touch-icon.png" />
          <link rel="icon" type="image/png" sizes="32x32" href="favicon-imgs/favicon-32x32.png" />
          <link rel="icon" type="image/png" sizes="16x16" href="favicon-imgs/favicon-16x16.png" />
          <link rel="manifest" href="favicon-imgs/site.webmanifest" />
          <link rel="mask-icon" href="favicon-imgs/safari-pinned-tab.svg" color="#5bbad5" />
          <meta name="msapplication-TileColor" content="#ffffff" />
          <meta name="theme-color" content="#ffffff" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

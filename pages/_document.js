import Document, { Html, Head, Main, NextScript } from 'next/document';
import { SheetsRegistry, JssProvider, createGenerateId } from 'react-jss';

const description =
  'Sweeney Restoration strives to provide high quality service in home remodels and new home construction. We believe in building relationships through transparency, trust and teamwork. Our team will manage every project with careful attention to you and to every detail.';
const keywords =
  'sweeney restoration, full, service, residential, new construction, contractor, historic, home renovation, bathroom renovation, kitchen remodel, remodeling, new orleans, fern street, sweeney, louisiana, hvac, home remodel, doors, paint, subcontractor, devon';
const logoImg = 'https://www.sweeneyrestoration.com/logo-small.png';

export default class JssDocument extends Document {
  static async getInitialProps(ctx) {
    const registry = new SheetsRegistry();
    const generateId = createGenerateId();
    const originalRenderPage = ctx.renderPage;
    ctx.renderPage = () =>
      originalRenderPage({
        enhanceApp: (App) => (props) => (
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
          <meta httpEquiv="X-UA-Compatible" content="IE=edge,chrome=1" />
          <link rel="apple-touch-icon" sizes="180x180" href="favicon-imgs/apple-touch-icon.png" />
          <link rel="icon" type="image/png" sizes="32x32" href="favicon-imgs/favicon-32x32.png" />
          <link rel="icon" type="image/png" sizes="16x16" href="favicon-imgs/favicon-16x16.png" />
          <link rel="manifest" href="favicon-imgs/site.webmanifest" />
          <link rel="mask-icon" href="favicon-imgs/safari-pinned-tab.svg" color="#5bbad5" />
          <meta name="msapplication-TileColor" content="#ffffff" />
          <meta name="theme-color" content="#ffffff" />
          <meta name="description" content={description} />
          <meta name="keywords" content={keywords} />
          <meta name="twitter:site" content="sweeneyllc" />
          <meta name="twitter:description" content={description} />
          <meta name="twitter:image" content={logoImg} />
          <meta property="og:description" content={description} />
          <meta property="og:site_name" content="Sweeney Restoration - Built It Right" />
          <meta property="og:type" content="company" />
          <meta property="og:image" content={logoImg} />
          <script
            type="application/ld+json"
            /* eslint-disable-next-line react/no-danger */
            dangerouslySetInnerHTML={{
              __html: `
              {
                "@context": "http://schema.org",
                "@type": "Organization",
                "name": "Sweeney Restoration",
                "telephone": "(800) 782-1967",
                "logo": "${logoImg}",
                "url": "https://www.sweeneyrestoration.com/",
                "sameAs": [
                    "https://twitter.com/sweeneyllc",
                    "https://www.yelp.com/biz/sweeney-restoration-new-orleans",
                    "https://www.instagram.com/sweeneyrestoration",
                    "https://www.facebook.com/SweeneyRestoration/"
                ]
              }
          `,
            }}
          />
          <script async src="https://www.googletagmanager.com/gtag/js?id=G-8HBZNDJ33Y" />
          <script
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());

                gtag('config', 'G-8HBZNDJ33Y');
                `,
            }}
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

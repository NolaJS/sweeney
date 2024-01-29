import App from 'next/app';
import { ThemeProvider } from 'react-jss';
import { config } from '@fortawesome/fontawesome-svg-core';
import Script from 'next/script';

import theme from '../themes/default';
import Layout from '../layout/Layout';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-svg-core/styles.css';
import './styles.css';

config.autoAddCss = false;

export default class MyApp extends App {
  componentDidMount() {
    const style = document.getElementById('server-side-styles');
    if (style) {
      style.parentNode.removeChild(style);
    }
  }

  render() {
    const { Component, pageProps } = this.props;
    return (
      <ThemeProvider theme={theme}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
        <Script src="https://cdn.nicejob.co/js/sdk.min.js?id=4697167944089600" />
      </ThemeProvider>
    );
  }
}

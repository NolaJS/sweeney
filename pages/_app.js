import App from 'next/app';
import { ThemeProvider } from 'react-jss';

import theme from '../themes/default';
import Layout from '../layout/Layout';
import './styles.css';
import 'bootstrap/dist/css/bootstrap.min.css';

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
      </ThemeProvider>
    );
  }
}

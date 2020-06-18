import Head from 'next/head';
import PageHead from '../components/PageHead';

const Portfolio = () => {
  return (
    <div>
      <Head>
        <title>Portfolio | Sweeney Restoration</title>
        <meta property="og:title" content="Portfolio | Sweeney Restoration" key="title" />
      </Head>
      <PageHead title="Portfolio" />
    </div>
  );
};

export default Portfolio;

import Head from 'next/head';
import { Container } from 'reactstrap';
import PageHead from '../components/PageHead';
import Content from '../components/Content';
import Carousel from '../components/Carousel';

const jena = [
  {
    src:
      'https://lirp-cdn.multiscreensite.com/f4423934/dms3rep/multi/opt/Jena+-+before+n+after+1-1920w.jpg',
  },
  {
    src:
      'https://lirp-cdn.multiscreensite.com/f4423934/dms3rep/multi/opt/Jena+-+008_1600x1067_mls_1600x1067-1920w.jpg',
  },
  {
    src:
      'https://lirp-cdn.multiscreensite.com/f4423934/dms3rep/multi/opt/Jena+-+before+n+after+2-1920w.jpg',
  },
];

const Portfolio = () => {
  return (
    <div>
      <Head>
        <title>Portfolio | Sweeney Restoration</title>
        <meta property="og:title" content="Portfolio | Sweeney Restoration" key="title" />
      </Head>
      <PageHead
        title="Portfolio"
        img="https://lirp-cdn.multiscreensite.com/f4423934/dms3rep/multi/opt/m1-1920w.jpg"
      />
      <Container>
        <Content title="Jena">
          <Carousel items={jena} />
        </Content>
      </Container>
    </div>
  );
};

export default Portfolio;

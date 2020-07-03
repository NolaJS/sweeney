import Head from 'next/head';
import { Container } from 'reactstrap';
import PageHead from '../components/PageHead';
import Content from '../components/Content';
import Carousel from '../components/Carousel';
import picBuckets from '../utils/output.json';

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
        {picBuckets.map(p => (
          <Content key={p.name} title={p.name}>
            <Carousel items={p.pics} />
          </Content>
        ))}
      </Container>
    </div>
  );
};

export default Portfolio;

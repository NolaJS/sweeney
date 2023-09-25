import Head from 'next/head';
import { Container } from 'reactstrap';
import PageHead from '../components/PageHead';
import Content from '../components/Content';
import Carousel from '../components/Carousel';
import picBuckets from '../utils/output.json';

function Portfolio() {
  return (
    <div>
      <Head>
        <title>Portfolio | Sweeney Restoration</title>
        <meta property="og:title" content="Portfolio | Sweeney Restoration" key="title" />
        <meta name="robots" content="index,follow" />
      </Head>
      <PageHead title="Portfolio" img="portfolio.jpg" />
      <Container>
        {picBuckets.map((p) => (
          <Content key={p.name} title={p.name.split('-')[1]}>
            <Carousel items={p.pics} />
          </Content>
        ))}
      </Container>
    </div>
  );
}

export default Portfolio;

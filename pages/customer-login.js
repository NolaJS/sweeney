import Head from 'next/head';
import { Container } from 'reactstrap';
import PageHead from '../components/PageHead';

const Portfolio = () => {
  return (
    <div>
      <Head>
        <title>Customer Login | Sweeney Restoration</title>
        <meta property="og:title" content="Customer Login | Sweeney Restoration" key="title" />
      </Head>
      <PageHead
        title="Customer Login"
        img="https://lirp-cdn.multiscreensite.com/f4423934/dms3rep/multi/opt/m1-1920w.jpg"
      />
      <Container>
        <div className="text-center">
          <iframe
            src="https://www.co-construct.com/app/skins/sweeney-restoration/IFrameLogin.html"
            height="210px"
            width="auto"
            frameBorder="0"
            scrolling="no"
            title="co-construct login"
          />
        </div>
      </Container>
    </div>
  );
};

export default Portfolio;

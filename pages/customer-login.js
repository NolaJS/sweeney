import Head from 'next/head';
import { Container } from 'reactstrap';
import PageHead from '../components/PageHead';

function Portfolio() {
  return (
    <div>
      <Head>
        <title>Customer Login | Sweeney Restoration</title>
        <meta property="og:title" content="Customer Login | Sweeney Restoration" key="title" />
      </Head>
      <PageHead title="Customer Login" img="customer-login.jpg" />
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
}

export default Portfolio;

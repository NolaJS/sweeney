import Head from 'next/head';
import Link from 'next/link';
import { Jumbotron, Container, Button } from 'reactstrap';
import { createUseStyles } from 'react-jss';
import classnames from 'classnames';

import Content from '../components/Content';

const useStyles = createUseStyles({
  jumbo: {
    background: 'transparent',
    borderRadius: 0,
    paddingTop: 50,
    position: 'relative',
  },
  jumboImage: {
    '@media (min-width: 1000px)': {
      objectPosition: '50% 65%',
    },
    filter: 'brightness(0.7)',
    height: '100%',
    left: 0,
    objectFit: 'cover',
    position: 'absolute',
    top: 0,
    width: '100%',
    zIndex: -1,
  },
});

const Home = () => {
  const classes = useStyles();
  return (
    <>
      <Head>
        <title>Home | Sweeney Restoration</title>
        <meta property="og:title" content="Home | Sweeney Restoration" key="title" />
      </Head>
      <Jumbotron className={classnames('text-white', classes.jumbo)}>
        <img
          src="https://lirp-cdn.multiscreensite.com/f4423934/dms3rep/multi/opt/ch9-1920w.jpg"
          alt="lead"
          className={classes.jumboImage}
        />
        <h1 className="display-3">Sweeney Restoration</h1>
        <p className="display-4">Build It Right</p>
        <p className="lead">
          <Link href="/contact-us">
            <Button color="primary">Request a Quote</Button>
          </Link>
        </p>
      </Jumbotron>
      <Container>
        <Content title="Mission.">
          <p>
            Sweeney Restoration, LLC is a full service, licensed residential building contractor
            specializing in historic home renovations and new construction. The mission of Sweeney
            Restoration is to provide high quality construction service that enriches the lives of
            our clients. We offer personal and hands on service to ensure quality control and we
            believe that quality starts from the inside and shows through to the finished product.
          </p>
        </Content>
        <Content title="Design.">
          <p>
            Our projects are the result of collaboration with talented architects, great clients,
            skilled craftsmen, and our construction management team.
          </p>
        </Content>
        <Content title="Ownership.">
          <p>
            SRLLC was established in the wake of hurricane Katrina to provide affordable, quality
            renovations to New Orleans area home owners. In the midst of so many expensive, out of
            town and scam contractors attracted to the region by the amount of work, Devon Sweeney
            found inspiration and established Sweeney Restoration. He was determined to offer a high
            quality renovation service to his friends and referred clients. Since then SRLLC has
            grown to become a full service general contracting company. Experienced in remodel, new
            and historic construction.
          </p>
        </Content>
      </Container>
    </>
  );
};

export default Home;

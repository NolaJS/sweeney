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

function Home() {
  const classes = useStyles();
  return (
    <>
      <Head>
        <title>Home | Sweeney Restoration</title>
        <meta property="og:title" content="Home | Sweeney Restoration" key="title" />
        <meta name="robots" content="index,follow" />
      </Head>
      <Jumbotron className={classnames('text-white', classes.jumbo)}>
        <img src="home.jpg" alt="lead" className={classes.jumboImage} />
        <h1 className="display-3">Sweeney Restoration</h1>
        <p className="display-4">Build It Right</p>
        <p className="lead">
          <Link legacyBehavior href="/contact-us">
            <Button color="primary">Request a Quote</Button>
          </Link>
        </p>
      </Jumbotron>
      <Container>
        <Content title="Mission.">
          <p>
            Sweeney Restoration strives to provide high quality service in home remodels and new
            home construction. We believe in building relationships through transparency, trust and
            teamwork. Our team will manage every project with careful attention to you and to every
            detail.
          </p>
        </Content>
        <Content title="Design.">
          <p>
            Our projects are the result of collaboration with talented architects, great clients,
            skilled craftsmen and our construction management team.
          </p>
        </Content>
        <Content title="Management.">
          <p>
            Each project undertaken offers personal, hands on service to ensure quality control.
            Trust, communication and honesty are valued above all else. Accessibility to project
            budgets, invoices and correspondence is provided to our clients related to their job.
          </p>
        </Content>
      </Container>
    </>
  );
}

export default Home;

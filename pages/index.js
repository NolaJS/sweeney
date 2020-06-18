import Head from 'next/head';
import { Jumbotron, Container, Button } from 'reactstrap';
import { createUseStyles } from 'react-jss';

import Content from '../components/Content';

const useStyles = createUseStyles({
  jumbo: {
    backgroundImage: 'url(/front.svg)',
    backgroundPosition: 'right',
    backgroundRepeat: 'no-repeat',
    backgroundSize: '50%',
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
      <Jumbotron className={classes.jumbo}>
        <h1 className="display-3">Sweeney Restoration</h1>
        <p className="lead">New Orleans Construction that's built right.</p>
        <p className="lead">
          <Button color="primary">Learn More</Button>
        </p>
      </Jumbotron>
      <Container>
        <Content />
        <Content />
        <Content />
      </Container>
    </>
  );
};

export default Home;

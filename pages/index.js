import { Jumbotron, Container, Button } from 'reactstrap';

import Content from '../components/Content';

const Home = () => {
  return (
    <>
      <Jumbotron>
        <h1 className="display-3">Sweeney Restoration</h1>
        <p className="lead">New Orleans Construction that's built right.</p>
        <hr className="my-2" />
        <p>
          It uses utility classes for typography and spacing to space content out within the larger
          container.
        </p>
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

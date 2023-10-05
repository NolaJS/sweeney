import Head from 'next/head';
import { Row, Col, Container } from 'reactstrap';
import Content from '../components/Content';
import PageHead from '../components/PageHead';

function Architects() {
  return (
    <div>
      <Head>
        <title>Architects & Designers | Sweeney Restoration</title>
        <meta
          property="og:title"
          content="Architects & Designers | Sweeney Restoration"
          key="title"
        />
        <meta name="robots" content="index,follow" />
      </Head>
      <PageHead title="Architects & Designers" img="architect.jpg" />
      <Container>
        <Row>
          <Col lg={6}>
            <Content title="Architects and Designers">
              We are always pleased to recommend an architect or designer for your custom renovation
              project or custom home. Our recommendations include select contacts as well as
              architects from the New Orleans area with whom we collaborate and facilitate to
              streamline the construction process.
            </Content>
            <Content title="Note to Architects & Designers">
              Sweeney Restoration has worked with many architects throughout New Orleans, and we
              understand that most architects have a select group of builders they trust to build
              their projects.
            </Content>
          </Col>
          <Col lg={6}>
            <p>
              We would like an opportunity to have a conversation during your contractor selection
              process. Partnering with you in the pre-construction phase adds value and frees up
              your time and resources. Sweeney Restoration will act as your permitting liaison and
              provide pricing input as design progresses.
            </p>
            <p>
              Your submittal requirements can be integrated in ways that work for you. Also, we can
              provide an internal submittal platform if you don’t already have a process in place.
              We have an understanding of your needs and are here to support your process.
            </p>
            <p>
              In our experience, working with talented architects and designers is a great
              opportunity for the client and ourselves. The results are remarkable when a team of
              professionals take a construction project from conception to completion.
            </p>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Architects;

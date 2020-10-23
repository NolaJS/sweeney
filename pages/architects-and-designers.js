import Head from 'next/head';
import { Row, Col, Container } from 'reactstrap';
import Content from '../components/Content';
import PageHead from '../components/PageHead';

const Architects = () => {
  return (
    <div>
      <Head>
        <title>Architects & Designers | Sweeney Restoration</title>
        <meta
          property="og:title"
          content="Architects & Designers | Sweeney Restoration"
          key="title"
        />
      </Head>
      <PageHead title="Architects & Designers" img="architect.jpg" />
      <Container>
        <Row>
          <Col lg={6}>
            <Content title="Architects and Designers">
              Depending on your needs, we are always pleased to recommend an Architect or Designer
              for your custom renovation project or custom home, and our recommendations include
              select contacts as well as architects from the New Orleans area, with whom we
              collaborate and facilitate to streamline processes here in New Orleans.
            </Content>
            <Content title="Note to Architects & Designers">
              If you are an architect designing a home in New Orleans, you might not be based here.
              We’ve worked with many Architects throughout the New Orleans area, and understand that
              most Architects have a select group of builders they trust to build their projects.
            </Content>
          </Col>
          <Col lg={6}>
            <p>
              We’d love an opportunity to have a conversation during your Contractor selection
              process, and believe we have the capacity and reputation necessary to build your
              projects. We’d like to partner with you in the pre-construction phase, and add value
              that frees up your time and resources. We are happy to act as your permitting
              coordination liaison, and provide pricing input as design progresses.
            </p>
            <p>
              We can integrate your submittal requirements in ways that work for you – or we can
              provide our internal submittal platform if you don’t have a process in place that you
              love. We understand what you need, and are here to support your process.
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
};

export default Architects;

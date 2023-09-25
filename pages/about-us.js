import Head from 'next/head';
import { Container, Row, Col, Card, CardTitle, CardBody, CardSubtitle } from 'reactstrap';
import Content from '../components/Content';
import PageHead from '../components/PageHead';

const employees = [
  {
    description:
      'Devon is the dedicated owner of this expanding small business. He strives to continue to offer more and more high quality construction services to his clients. As well, he takes prides in providing a living for his core employees and teams of sub-contractors.',
    image: 'https://lirp-cdn.multiscreensite.com/f4423934/dms3rep/multi/opt/devon-1200w.jpg',
    name: 'Devon Sweeney',
    title: 'Owner & President',
  },
  {
    description:
      'Travis is the one leader that keeps all projects progressing on a daily basis. His extensive experience and strong work ethic gives him the ability to "juggle" many tasks while communicating with the clients and employees/subs. His main goal is to ensure that clients wishes and needs come through in the final product.',
    image: 'https://lirp-cdn.multiscreensite.com/f4423934/dms3rep/multi/opt/travis-960w.jpg',
    name: 'Angele Dassel',
    title: 'Selections Manager',
  },
];

function About() {
  return (
    <div>
      <Head>
        <title>About Us | Sweeney Restoration</title>
        <meta property="og:title" content="About Us | Sweeney Restoration" key="title" />
        <meta name="robots" content="index,follow" />
      </Head>
      <PageHead title="About Us" img="about.jpg" />
      <Container>
        <Content title="This is our story">
          <Row className="align-items-center">
            <Col>
              <p>
                Sweeney Restoration was established in the wake of hurricane Katrina to provide
                quality renovations and reliable service to the New Orleans community. In the midst
                of regional rejuvenation and restoration, Devon Sweeney found inspiration and
                established Sweeney Restoration. His goal was to provide excellent construction
                services to his clients. Since then, Sweeney Restoration has grown to become a
                full-service general contracting business providing custom remodeling and new
                construction.
              </p>
              <p>LA Residential Building Contractor License # 881928.</p>
            </Col>
          </Row>
        </Content>
        <Content title="Who are we?">
          <Row className="justify-content-center">
            {employees.map((e) => (
              <Col key={`employee-${e.name}`} sm={12} className="mb-4">
                <Card className="h-100">
                  <CardBody>
                    <CardTitle className="h3">{e.name}</CardTitle>
                    <CardSubtitle className="lead">{e.title}</CardSubtitle>
                  </CardBody>
                </Card>
              </Col>
            ))}
          </Row>
        </Content>
      </Container>
    </div>
  );
}

export default About;

import Head from 'next/head';
import { Container, Row, Col, Card, CardTitle, CardBody, CardSubtitle, CardText } from 'reactstrap';
import Content from '../components/Content';
import PageHead from '../components/PageHead';

const employees = [
  {
    description:
      'Devon is the dedicated owner of this expanding small business. He strives to continue to offer more and more high quality construction services to his clients. As well, he takes prides in providing a living for his core employees and teams of sub-contractors.',
    image: 'https://lirp-cdn.multiscreensite.com/f4423934/dms3rep/multi/opt/devon-1200w.jpg',
    name: 'Devon Sweeney',
    title: 'Owner, CEO, CFO',
  },
  {
    description:
      'Travis is the one leader that keeps all projects progressing on a daily basis. His extensive experience and strong work ethic gives him the ability to "juggle" many tasks while communicating with the clients and employees/subs. His main goal is to ensure that clients wishes and needs come through in the final product.',
    image: 'https://lirp-cdn.multiscreensite.com/f4423934/dms3rep/multi/opt/travis-960w.jpg',
    name: 'Travis Spencer',
    title: 'COO, Project Manager',
  },
  {
    description:
      'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Saepe tenetur, atque accusamus debitis eius a blanditiis aut. Non corrupti tenetur numquam totam expedita minus. Minus corrupti dolore necessitatibus reprehenderit nulla.',
    image: 'https://lirp-cdn.multiscreensite.com/f4423934/dms3rep/multi/opt/travis-960w.jpg',
    name: 'Will Someone',
    title: 'TBA',
  },
];

const About = () => {
  return (
    <div>
      <Head>
        <title>About Us | Sweeney Restoration</title>
        <meta property="og:title" content="About Us | Sweeney Restoration" key="title" />
      </Head>
      <PageHead
        title="About Us"
        img="https://lirp-cdn.multiscreensite.com/f4423934/dms3rep/multi/opt/ch10-1920w.jpg"
      />
      <Container>
        <Content title="This is Our Story">
          <Row className="align-items-center">
            <Col>
              <p>
                Sweeney Restoration, LLC is a full service, licensed residential building contractor
                specializing in historic home renovations and new construction.
              </p>
              <p>LA Residential Building Contractor License # 881928</p>
            </Col>
          </Row>
        </Content>
        <Content title="Company Biography">
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
        <Content title="Who are we?">
          <Row className="justify-content-center">
            {employees.map(e => (
              <Col key={`employee-${e.name}`} lg={6} sm={12} className="mb-4">
                <Card className="h-100">
                  <CardBody>
                    <CardTitle className="display-4">{e.name}</CardTitle>
                    <CardSubtitle className="lead">{e.title}</CardSubtitle>
                    <hr />
                    <CardText>{e.description}</CardText>
                  </CardBody>
                </Card>
              </Col>
            ))}
          </Row>
        </Content>
      </Container>
    </div>
  );
};

export default About;

import { Row, Col, Container } from 'reactstrap';

const locale = {
  address: '4333 Washington Ave.',
  address2: 'New Orleans, LA 70125',
  by: 'NolaJS',
  company: 'Sweeney Restoration',
  copyright: 'Copyright',
  design: 'Designed and Built by',
  email: 'info@sweeneyrestoration.com',
  phone: '504-533-0007',
};

const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <Container fluid className="bg-dark p-3 text-white">
      <Row>
        <Col>
          {locale.company}
          4333 Washington Ave.
        </Col>
      </Row>
      <Row>
        <Col>
          {locale.copyright} {year} {locale.company}
        </Col>
        <Col className="text-right">
          {locale.design} {locale.by}
        </Col>
      </Row>
    </Container>
  );
};

export default Footer;

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
      <Container>
        <Row className="text-center">
          <Col md={6}>
            <p className="m-0">{locale.address}</p>
            <p className="m-0">{locale.address2}</p>
          </Col>
          <Col md={6}>
            <p className="m-0">{locale.email}</p>
            <p className="m-0">{locale.phone}</p>
          </Col>
        </Row>
      </Container>
      <Row className="text-center">
        <Col>
          <p className="m-0">
            {locale.copyright} {year} {locale.company}
          </p>
          <p className="m-0">
            {locale.design} {locale.by}
          </p>
        </Col>
      </Row>
    </Container>
  );
};

export default Footer;

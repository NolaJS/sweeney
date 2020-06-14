import { Row, Col } from 'reactstrap';

const locale = {
  by: 'NolaJS',
  company: 'Sweeney Restoration',
  copyright: 'Copyright',
  design: 'Designed and Built by',
  phone: '555-555-5555',
};

const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <Row className="fixed-bottom bg-dark p-3 text-white">
      <Col>
        {locale.copyright} {year} {locale.company}
      </Col>
      <Col className="text-right">
        {locale.design} {locale.by}
      </Col>
    </Row>
  );
};

export default Footer;

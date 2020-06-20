import Head from 'next/head';
import { Col, Row, Form, FormGroup, Label, Input, Container, Button } from 'reactstrap';
import Content from '../components/Content';
import PageHead from '../components/PageHead';

const Contact = () => {
  return (
    <div>
      <Head>
        <title>Contact Us | Sweeney Restoration</title>
        <meta property="og:title" content="Contact Us | Sweeney Restoration" key="title" />
      </Head>
      <PageHead
        title="Contact Us"
        img="https://lirp-cdn.multiscreensite.com/f4423934/dms3rep/multi/opt/mz13-1920w.jpg"
      />
      <Container>
        <Row>
          <Col md={8} className="mb-4">
            <Form>
              <Row>
                <Col>
                  <FormGroup>
                    <Label for="name">Name</Label>
                    <Input name="name" id="name" />
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup>
                    <Label for="email">Email</Label>
                    <Input type="email" name="email" id="email" />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col>
                  <FormGroup>
                    <Label for="phoneNumber">Phone Number</Label>
                    <Input name="phoneNumber" id="phoneNumber" />
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup>
                    <Label for="projectAddress">Project Address</Label>
                    <Input name="projectAddress" id="projectAddress" />
                  </FormGroup>
                </Col>
              </Row>
              <FormGroup>
                <Label for="projectType">Project Type</Label>
                <Input type="select" name="ProjectType" id="projectType">
                  <option>Historic Restoration</option>
                  <option>New Construction</option>
                  <option>Renovations</option>
                  <option>Addition</option>
                  <option>Other</option>
                </Input>
              </FormGroup>
              <FormGroup>
                <Label for="description">Project Description</Label>
                <Input type="textarea" name="description" id="description" />
              </FormGroup>
              <Button size="lg" block color="primary">
                Submit
              </Button>
            </Form>
          </Col>
          <Col md={4}>
            <Content title="Office Hours">
              <p className="m-0">Monday 7:30AM - 4:30PM</p>
              <p className="m-0">Tuesday 7:30AM - 4:30PM</p>
              <p className="m-0">Wednesday 7:30AM - 4:30PM</p>
              <p className="m-0">Thursday 7:30AM - 4:30PM</p>
              <p className="m-0">Friday 7:30AM - 4:30PM</p>
              <p className="m-0">Saturday CLOSED</p>
              <p className="m-0">Sunday CLOSED</p>
            </Content>
            <div className="mt-4">
              <Content title="General Information">
                <p className="m-0">4333 Washington Ave.</p>
                <p className="m-0">New Orleans, LA 70125</p>
                <p className="m-0">
                  Phone: <a href="tel:504-533-0007">504-533-0007</a>
                </p>
                <p className="m-0">
                  Email:{' '}
                  <a href="mailto:info@sweeneyrestoration.com">info@sweeneyrestoration.com</a>
                </p>
              </Content>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Contact;

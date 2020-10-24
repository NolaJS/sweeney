import { useCallback, useState, useMemo } from 'react';
import Head from 'next/head';
import { Col, Row, Form, FormGroup, Label, Input, Container, Button, Spinner } from 'reactstrap';
import { createUseStyles } from 'react-jss';
import Content from '../components/Content';
import PageHead from '../components/PageHead';

const useStyles = createUseStyles({
  google: {
    fontSize: 10,
    fontStyle: 'italic',
    textAlign: 'center',
  },
});

const Contact = () => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [formState, setFormState] = useState({
    description: '',
    email: '',
    name: '',
    phoneNumber: '',
    projectAddress: '',
    projectType: 'New Construction',
  });
  const classes = useStyles();

  const onSubmit = useCallback(
    e => {
      e.preventDefault();
      setLoading(true);
      setError(false);
      window.grecaptcha.ready(() => {
        window.grecaptcha
          .execute('6LcttdgZAAAAADqMr5udsQdCKWQies8zkPSiMZoi', { action: 'submit' })
          .then(token =>
            fetch('/api/sendEmail', {
              body: JSON.stringify({ ...formState, token }),
              headers: {
                'Content-Type': 'application/json',
              },
              method: 'POST',
            }),
          )
          .then(res => {
            if (res.status !== 200) {
              setError(true);
            } else {
              setSuccess(true);
            }
            setLoading(false);
          })
          .catch(() => {
            setError(true);
            setLoading(false);
          });
      });
    },
    [formState],
  );

  const onChange = useCallback(e => {
    const { name, value } = e.target;
    setFormState(f => ({
      ...f,
      [name]: value,
    }));
  }, []);

  const formUi = useMemo(() => {
    if (success) {
      return <h3>Thank you for contacting Sweeney Restoration. We will contact you shortly.</h3>;
    }

    return (
      <Form onSubmit={onSubmit}>
        {error ? <p className="text-danger">An error occurred please try again.</p> : null}
        <Row>
          <Col>
            <FormGroup>
              <Label for="name">Name</Label>
              <Input name="name" id="name" onChange={onChange} value={formState.name} />
            </FormGroup>
          </Col>
          <Col>
            <FormGroup>
              <Label for="email">Email</Label>
              <Input
                type="email"
                name="email"
                id="email"
                onChange={onChange}
                value={formState.email}
              />
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col>
            <FormGroup>
              <Label for="phoneNumber">Phone Number</Label>
              <Input
                type="tel"
                name="phoneNumber"
                id="phoneNumber"
                onChange={onChange}
                value={formState.phoneNumber}
              />
            </FormGroup>
          </Col>
          <Col>
            <FormGroup>
              <Label for="projectAddress">Project Address</Label>
              <Input
                name="projectAddress"
                id="projectAddress"
                onChange={onChange}
                value={formState.projectAddress}
              />
            </FormGroup>
          </Col>
        </Row>
        <FormGroup>
          <Label for="projectType">Project Type</Label>
          <Input
            type="select"
            name="projectType"
            id="projectType"
            onChange={onChange}
            value={formState.projectType}
          >
            <option>New Construction</option>
            <option>Remodel</option>
            <option>Addition</option>
            <option>Other</option>
          </Input>
        </FormGroup>
        <FormGroup>
          <Label for="description">Project Description</Label>
          <Input type="textarea" name="description" id="description" onChange={onChange} />
        </FormGroup>
        <Button size="lg" block color="primary" type="submit" disabled={loading}>
          {loading ? <Spinner color="light" /> : 'Submit'}
        </Button>
        <p className={classes.google}>
          This site is protected by reCAPTCHA and the Google{' '}
          <a target="_blank" rel="noreferrer" href="https://policies.google.com/privacy">
            Privacy Policy
          </a>{' '}
          and{' '}
          <a target="_blank" rel="noreferrer" href="https://policies.google.com/terms">
            Terms of Service
          </a>{' '}
          apply.
        </p>
      </Form>
    );
  }, [
    error,
    formState.email,
    formState.name,
    formState.phoneNumber,
    formState.projectAddress,
    formState.projectType,
    loading,
    onChange,
    onSubmit,
    success,
    classes.google,
  ]);

  return (
    <div>
      <Head>
        <title>Contact Us | Sweeney Restoration</title>
        <meta property="og:title" content="Contact Us | Sweeney Restoration" key="title" />
        <meta name="robots" content="index,follow" />
        <script src="https://www.google.com/recaptcha/api.js?render=6LcttdgZAAAAADqMr5udsQdCKWQies8zkPSiMZoi" />
      </Head>
      <PageHead title="Contact Us" img="contact.jpg" />
      <Container>
        <Row>
          <Col md={8} className="mb-4">
            {formUi}
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

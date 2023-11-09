/* eslint-disable jsx-a11y/label-has-associated-control, no-param-reassign, no-restricted-syntax */
import Head from 'next/head';
import Script from 'next/script';
import { useState } from 'react';
import {
  Col,
  Row,
  Form,
  Container,
  Input,
  Label,
  FormGroup,
  FormFeedback,
  FormText,
  Button,
} from 'reactstrap';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Content from '../components/Content';
import PageHead from '../components/PageHead';

const contactUsSchema = Yup.object().shape({
  address: Yup.string().required("Please enter your project's address.").default(''),
  description: Yup.string().default(''),
  email: Yup.string()
    .email('Please enter a valid email address.')
    .required('Please enter your email')
    .default(''),
  firm: Yup.string().default(''),
  firstName: Yup.string().required('Please enter your first name.').default(''),
  lastName: Yup.string().required('Please enter your last name.').default(''),
  phone: Yup.string()
    .required('Please enter a valid phone')
    .required('Password is required')
    .min(4, 'Password is too short - should be 4 chars minimum')
    .default(''),
  projectPhase: Yup.string().required('Please select the phase for your project.').default(''),
  projectType: Yup.string().required('Please select the project type.').default(''),
});

contactUsSchema.getDefault();

function Contact() {
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const formik = useFormik({
    initialValues: { ...contactUsSchema.getDefault(), attachments: [] },
    onSubmit: (values, { setSubmitting }) => {
      setError(false);
      const formData = new FormData();
      const secondForm = new FormData();
      window.grecaptcha.ready(() => {
        window.grecaptcha
          .execute('6LcttdgZAAAAADqMr5udsQdCKWQies8zkPSiMZoi', { action: 'submit' })
          .then((token) => {
            formData.append('token', token);
            formData.append('firstName', values.firstName);
            formData.append('lastName', values.lastName);
            formData.append('firm', values.firm);
            formData.append('address', values.address);
            formData.append('description', values.description);
            formData.append('phone', values.phone);
            formData.append('email', values.email);
            formData.append('projectType', values.projectType);
            formData.append('projectPhase', values.projectPhase);
            formData.append('hasFiles', values.attachments.length ? 'true' : 'false');

            fetch('/api/addDeal', {
              body: formData,
              method: 'POST',
            })
              .then((resp) => resp.json())
              .then(({ dealId, folderId }) => {
                if (!values.attachments.length) return { status: 200 };
                secondForm.append('folderId', folderId);
                secondForm.append('dealId', dealId);
                for (let i = 0; i < values.attachments.length; i += 1) {
                  secondForm.append(`attachments${i}`, values.attachments[i]);
                }
                return fetch('https://handlefiles-yeyrbzgx3q-uc.a.run.app', {
                  body: secondForm,
                  method: 'POST',
                });
              })
              .then((resp) => {
                if (resp.status === 200) {
                  setSuccess(true);
                } else {
                  setError(true);
                }
                setSubmitting(false);
              })
              .catch(() => {
                setError(true);
              });
          });
      });
    },
    validationSchema: contactUsSchema,
  });

  return (
    <div>
      <Head>
        <title>Contact Us | Sweeney Restoration</title>
        <meta property="og:title" content="Contact Us | Sweeney Restoration" key="title" />
      </Head>
      <Script src="https://www.google.com/recaptcha/api.js?render=6LcttdgZAAAAADqMr5udsQdCKWQies8zkPSiMZoi" />
      <PageHead title="Contact Us" img="contact.jpg" />
      <Container>
        <Row>
          <Col md={8} className="mb-4">
            {error ? <p className="text-danger">An error occurred please try again.</p> : null}
            {success ? (
              <h3>Thank you for contacting Sweeney Restoration. We will contact you shortly.</h3>
            ) : (
              <Form onSubmit={formik.handleSubmit}>
                <Row>
                  <FormGroup className="flex-grow-1 mx-2">
                    <Label for="firstName">First name</Label>
                    <Input
                      required
                      name="firstName"
                      id="firstName"
                      invalid={!!(formik.touched.firstName && formik.errors.firstName)}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.firstName}
                    />
                    <FormFeedback>Please enter your first name.</FormFeedback>
                  </FormGroup>
                  <FormGroup className="flex-grow-1 mx-2">
                    <Label for="lastName">Last name</Label>
                    <Input
                      required
                      name="lastName"
                      id="lastName"
                      invalid={!!(formik.touched.lastName && formik.errors.lastName)}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    <FormFeedback>Please enter your last name.</FormFeedback>
                  </FormGroup>
                </Row>
                <Row>
                  <FormGroup className="flex-grow-1 mx-2">
                    <Label for="email">Email</Label>
                    <Input
                      required
                      name="email"
                      id="email"
                      invalid={!!(formik.touched.email && formik.errors.email)}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    <FormFeedback>Please enter a valid email address.</FormFeedback>
                  </FormGroup>
                  <FormGroup className="flex-grow-1 mx-2">
                    <Label for="phone">Phone</Label>
                    <Input
                      required
                      type="tel"
                      name="phone"
                      id="phone"
                      invalid={!!(formik.touched.phone && formik.errors.phone)}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    <FormFeedback>Please enter your phone number.</FormFeedback>
                  </FormGroup>
                </Row>
                <Row>
                  <FormGroup className="flex-grow-1 mx-2">
                    <Label for="projectPhase">Project Phase</Label>
                    <Input
                      type="select"
                      name="projectPhase"
                      id="projectPhase"
                      invalid={!!(formik.touched.projectPhase && formik.errors.projectPhase)}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    >
                      <option value="">-- Select Phase --</option>
                      <option>Idea/Design</option>
                      <option>Architecture in Process</option>
                      <option>Building Plans Complete</option>
                      <option>Other</option>
                    </Input>
                    <FormFeedback>Please select the phase for your project.</FormFeedback>
                  </FormGroup>
                  <FormGroup className="flex-grow-1 mx-2">
                    <Label for="projectType">Project Type</Label>
                    <Input
                      type="select"
                      name="projectType"
                      id="projectType"
                      invalid={!!(formik.touched.projectType && formik.errors.projectType)}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    >
                      <option value="">-- Select Type --</option>
                      <option>New Construction</option>
                      <option>Complete Renovation</option>
                      <option>Partial Renovation</option>
                      <option>Addition</option>
                      <option>Commercial</option>
                      <option>Other</option>
                    </Input>
                    <FormFeedback>Please select the project type.</FormFeedback>
                  </FormGroup>
                </Row>
                <Row>
                  <FormGroup className="flex-grow-1 mx-2">
                    <Label for="address">Project address</Label>
                    <Input
                      required
                      name="address"
                      id="address"
                      invalid={!!(formik.touched.address && formik.errors.address)}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    <FormFeedback>Please enter your project&apos;s address.</FormFeedback>
                  </FormGroup>
                  <FormGroup className="flex-grow-1 mx-2">
                    <Label for="firm">Architecture Firm</Label>
                    <Input
                      name="firm"
                      id="firm"
                      invalid={!!(formik.touched.firm && formik.errors.firm)}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                  </FormGroup>
                </Row>
                <FormGroup className="flex-grow-1">
                  <Label for="description">Project description</Label>
                  <Input
                    name="description"
                    id="description"
                    type="textarea"
                    invalid={!!(formik.touched.description && formik.errors.description)}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="projectFiles">Project Files</Label>
                  <Input
                    id="projectFiles"
                    name="file"
                    type="file"
                    multiple
                    accept=".xlsx,.xls,image/*,.doc,.docx,.ppt,.pptx,.txt,.pdf,.rtf"
                    onChange={(e) => formik.setFieldValue('attachments', e.target.files)}
                  />
                  <FormText>If available, upload some files for your project.</FormText>
                </FormGroup>
                <Button
                  type="submit"
                  block
                  className="mb-4"
                  aria-busy={formik.isSubmitting}
                  disabled={formik.isSubmitting}
                  color="primary"
                >
                  Submit
                </Button>
              </Form>
            )}
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
}

export default Contact;

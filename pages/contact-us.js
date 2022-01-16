/* eslint-disable jsx-a11y/label-has-associated-control */
import Head from 'next/head';
import { Col, Row, Container } from 'reactstrap';
import Content from '../components/Content';
import PageHead from '../components/PageHead';

const Contact = () => {
  return (
    <div>
      <Head>
        <title>Contact Us | Sweeney Restoration</title>
        <meta property="og:title" content="Contact Us | Sweeney Restoration" key="title" />
        <meta name="robots" content="index,follow" />
        <link
          rel="stylesheet"
          type="text/css"
          href="https://coconstruct.com/app/public/LeadIntake/LeadIntakeForm.css?348844444"
        />
        <script
          type="text/javascript"
          src="https://coconstruct.com/app/api/LeadsIntakeForm/GetLeadsIntakeFormSubmissionJs?AuthKey=ZkhY0jMzK2WXARK03VSJj4AbY7yoz%2b0yBUSU9vD0TO4%3d"
        />
        <script type="text/javascript" src="scripts/fix.js" />
      </Head>
      <PageHead title="Contact Us" img="contact.jpg" />
      <Container>
        <Row>
          <Col md={8} className="mb-4">
            {/* CoConstruct's intake form - just a direct copy */}
            <div>
              <div id="divCoCoForm">
                <div className="coco-form-wrapper">
                  <div className="cocon-row">
                    <div>
                      <label className="coco-label">Name</label>
                    </div>
                    <div className="cocon-name-inputs">
                      <input
                        id="txtCoCoFirstName"
                        name="txtFirstName"
                        type="text"
                        className="coco-text-input"
                        placeholder="First Name"
                      />
                      <input
                        id="txtCoCoLastName"
                        name="txtLastName"
                        type="text"
                        className="coco-text-input"
                        placeholder="Last Name"
                      />
                    </div>
                    <div
                      id="divNameErrorBanner"
                      className="coco-error-banner"
                      style={{ display: 'none' }}
                    >
                      <div>Please enter your name</div>
                    </div>
                  </div>

                  <div className="cocon-row">
                    <div>
                      <label className="coco-label">Email</label>
                    </div>
                    <div>
                      <input id="txtCoCoEmail" type="text" className="coco-text-input" />
                    </div>
                    <div
                      id="divEmailErrorBanner"
                      className="coco-error-banner"
                      style={{ display: 'none' }}
                    >
                      <div id="spnEmailError" />
                    </div>
                  </div>

                  <div className="cocon-row">
                    <div>
                      <label className="coco-label">Phone</label>
                    </div>
                    <div>
                      <input type="text" id="txtCoCoPhone" className="coco-text-input" />
                    </div>
                  </div>

                  <div className="cocon-row">
                    <div>
                      <label className="coco-label">Message</label>
                    </div>
                    <div>
                      <textarea
                        id="txtCoCoMessage"
                        type="text"
                        className="coco-text-input"
                        maxLength="1000"
                      />
                    </div>
                  </div>

                  <div className="cocon-row">
                    <input id="txtHPData" type="text" className="coco-h-p" autoComplete="off" />
                  </div>

                  <div className="cocon-row">
                    <input
                      type="button"
                      id="btnLeadIntakeSubmit"
                      className="cocon-button"
                      value="Submit"
                    />
                    <div
                      id="divGenericErrorBanner"
                      className="coco-error-banner"
                      style={{ display: 'none' }}
                    >
                      {/* eslint-disable-next-line react/no-unescaped-entities */}
                      <span>This form can't be submitted. Try again later.</span>
                    </div>
                  </div>
                </div>
              </div>

              <div id="divCoCoConfirmation" style={{ display: 'none' }}>
                <div className="coco-confirmation-icon">
                  <svg width="132" height="132" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M66 132A66 66 0 1 1 66 0a66 66 0 0 1 0 132zm0-2A64 64 0 1 0 66 2a64 64 0 0 0 0 128zm-9.9-45.5l39-38.9 1.3 1.5-40.3 40.3-19.5-19.6 1.4-1.4L56 84.5z"
                      fill="currentColor"
                      fillRule="nonzero"
                    />
                  </svg>
                </div>
                <span>Your message has been sent.</span>
              </div>
            </div>
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

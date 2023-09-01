/* eslint-disable jsx-a11y/label-has-associated-control */
import Head from 'next/head';
import axios from 'axios';
import ReCAPTCHA from 'react-google-recaptcha';
import { useRef, useState } from 'react';
import { Col, Row, Container } from 'reactstrap';
import Content from '../components/Content';
import PageHead from '../components/PageHead';

const Contact = () => {
  const [files, setFiles] = useState(null);
  const [reCapVer, setRecapVer] = useState(true);

  const fName = useRef(null);
  const lName = useRef(null);
  const Email = useRef(null);
  const Phone = useRef(null);
  const descr = useRef(null);
  const pAddr = useRef(null);
  const pType = useRef(null);
  const phase = useRef(null);
  const firmN = useRef(null);
  const reCap = useRef(null);

  const verify = async (token) => {
    if (!token) {
      setRecapVer(true);
      reCap.current.reset();
      return;
    }
    try {
      await axios.post('/api/verifyReCAPTCHA', { token });
      setRecapVer(false);
    } catch {
      reCap.current.reset();
      setRecapVer(true);
    }
  };

  const handleSubmit = async (e) => {
    let verified = true;
    const tempRefs = {
      fName,
      lName,
      Email,
      Phone,
      descr,
      pAddr,
      pType,
      phase,
    };
    for (let key in tempRefs) {
      if (tempRefs[key].current.matches(':invalid')) {
        verified = false;
        document.getElementById(`${key}-error-banner`).style.display =
          'inherit';
      } else {
        document.getElementById(`${key}-error-banner`).style.display = 'none';
      }
    }
    if (!verified) {
      return;
    }

    const formData = new FormData();
    formData.append('firstname', fName.current.value);
    formData.append('lastname', lName.current.value);
    formData.append('email', Email.current.value);
    formData.append('phone', Phone.current.value);
    formData.append('dealname', pAddr.current.value);
    formData.append('phase', phase.current.value);
    formData.append('type', pType.current.value);
    formData.append('firm', firmN.current.value);
    formData.append('description', descr.current.value);

    if (files) {
      for (const key of files.keys()) {
        formData.append(key, files.get(key));
      }
    }

    try {
      await axios.post('/api/addDeal', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      Array.from(document.getElementsByTagName('input')).forEach(
        (e) => (e.value = '')
      );
      Array.from(document.getElementsByTagName('textarea')).forEach(
        (e) => (e.value = '')
      );
      Array.from(document.getElementsByTagName('select')).forEach(
        (e) => (e.value = '')
      );
      document.getElementById('divHubConfirmation').style.display = 'inherit';
    } catch (error) {
      console.error('Error:', error);
      document.getElementById('divGenericErrorBanner').style.display =
        'inherit';
    }
  };

  return (
    <div>
      <Head>
        <title>Contact Us | Sweeney Restoration</title>
        <meta
          property='og:title'
          content='Contact Us | Sweeney Restoration'
          key='title'
        />
        <script type='text/javascript' src='scripts/fix.js' />
      </Head>
      <PageHead title='Contact Us' img='contact.jpg' />
      <Container>
        <Row>
          <Col md={8} className='mb-4'>
            <Row>
              <Col>
                <label className='hub-label'>Name*</label>
              </Col>
            </Row>
            <Row>
              <Col>
                <input
                  required
                  id='fName'
                  name='fName'
                  type='text'
                  className='hub-text-input'
                  placeholder='First Name'
                  ref={fName}
                />
                <div
                  id='fName-error-banner'
                  className='hub-error-banner'
                  style={{ display: 'none' }}
                >
                  {/* eslint-disable-next-line react/no-unescaped-entities */}
                  <span>Please enter your first name.</span>
                </div>
              </Col>
              <Col>
                <input
                  required
                  id='lName'
                  name='lName'
                  type='text'
                  className='hub-text-input'
                  placeholder='Last Name'
                  ref={lName}
                />
                <div
                  id='lName-error-banner'
                  className='hub-error-banner'
                  style={{ display: 'none' }}
                >
                  {/* eslint-disable-next-line react/no-unescaped-entities */}
                  <span>Please enter your last name.</span>
                </div>
              </Col>
            </Row>
            <Row className='label-section'>
              <Col>
                <label className='hub-label'>Email*</label>
              </Col>
              <Col>
                <label className='hub-label'>Phone*</label>
              </Col>
            </Row>
            <Row>
              <Col>
                <input
                  required
                  id='Email'
                  type='email'
                  className='hub-text-input'
                  ref={Email}
                />
                <div
                  id='Email-error-banner'
                  className='hub-error-banner'
                  style={{ display: 'none' }}
                >
                  {/* eslint-disable-next-line react/no-unescaped-entities */}
                  <span>Please enter a valid email address.</span>
                </div>
              </Col>
              <Col>
                <input
                  required
                  type='tel'
                  id='Phone'
                  className='hub-text-input'
                  ref={Phone}
                />
                <div
                  id='Phone-error-banner'
                  className='hub-error-banner'
                  style={{ display: 'none' }}
                >
                  {/* eslint-disable-next-line react/no-unescaped-entities */}
                  <span>Please enter your phone number.</span>
                </div>
              </Col>
            </Row>
            <Row className='label-section'>
              <Col>
                <label className='hub-label'>Project Phase*</label>
              </Col>
              <Col>
                <label className='hub-label'>Project Type*</label>
              </Col>
            </Row>
            <Row>
              <Col>
                <select
                  className='form-input form-select hub-text-input'
                  name='phase'
                  id='phase'
                  ref={phase}
                  required
                >
                  <option className='select-option select-default' value=''>
                    {' '}
                    -- Select Phase --{' '}
                  </option>
                  <option className='select-option' value='Idea/Design'>
                    Idea/Design
                  </option>
                  <option
                    className='select-option'
                    value='Architecture in Process'
                  >
                    Architecture in Process
                  </option>
                  <option
                    className='select-option'
                    value='Building Plans Complete'
                  >
                    Building Plans Complete
                  </option>
                  <option className='select-option' value='Other'>
                    Other
                  </option>
                </select>
                <div
                  id='phase-error-banner'
                  className='hub-error-banner'
                  style={{ display: 'none' }}
                >
                  {/* eslint-disable-next-line react/no-unescaped-entities */}
                  <span>Please select the phase for your project.</span>
                </div>
              </Col>
              <Col>
                <select
                  className='form-input form-select hub-text-input'
                  name='pType'
                  id='pType'
                  ref={pType}
                  required
                >
                  <option className='select-option select-default' value=''>
                    {' '}
                    -- Select Type --{' '}
                  </option>
                  <option className='select-option' value='New Construction'>
                    New Construction
                  </option>
                  <option className='select-option' value='Complete Renovation'>
                    Complete Renovation
                  </option>
                  <option className='select-option' value='Partial Renovation'>
                    Partial Renovation
                  </option>
                  <option className='select-option' value='Addition'>
                    Addition
                  </option>
                  <option className='select-option' value='Commercial'>
                    Commercial
                  </option>
                  <option className='select-option' value='Other'>
                    Other
                  </option>
                </select>
                <div
                  id='pType-error-banner'
                  className='hub-error-banner'
                  style={{ display: 'none' }}
                >
                  {/* eslint-disable-next-line react/no-unescaped-entities */}
                  <span>Please select the type for your project.</span>
                </div>
              </Col>
            </Row>
            <Row className='label-section'>
              <Col>
                <label className='hub-label'>Project Address*</label>
              </Col>
              <Col>
                <label className='hub-label'>Architecture Firm</label>
              </Col>
            </Row>
            <Row>
              <Col>
                <input
                  required
                  type='text'
                  id='pAddr'
                  className='hub-text-input'
                  ref={pAddr}
                />
                <div
                  id='pAddr-error-banner'
                  className='hub-error-banner'
                  style={{ display: 'none' }}
                >
                  {/* eslint-disable-next-line react/no-unescaped-entities */}
                  <span>Please enter your project's address.</span>
                </div>
              </Col>
              <Col>
                <input
                  type='text'
                  id='firmN'
                  className='hub-text-input'
                  ref={firmN}
                />
              </Col>
            </Row>
            <Row className='label-section'>
              <Col>
                <label className='hub-label'>Project Description*</label>
              </Col>
            </Row>
            <Row>
              <Col>
                <textarea
                  required
                  id='descr'
                  type='text'
                  className='hub-text-input'
                  maxLength='1000'
                  ref={descr}
                />
                <div
                  id='descr-error-banner'
                  className='hub-error-banner'
                  style={{ display: 'none' }}
                >
                  {/* eslint-disable-next-line react/no-unescaped-entities */}
                  <span>Please enter a description of your project.</span>
                </div>
              </Col>
            </Row>
            <Row className='label-section'>
              <Col>
                <label className='hub-label'>Project Files</label>
              </Col>
            </Row>
            <Row>
              <Col>
                <input
                  name='file'
                  className='hub-text-input file-input'
                  id='pPlans'
                  type='file'
                  accept='.xlsx,.xls,image/*,.doc,.docx,.ppt,.pptx,.txt,.pdf,.rtf'
                  multiple
                  onInput={(e) => {
                    if (Array.from(e.target.files).length) {
                      const temp = new FormData();
                      Array.from(e.target.files).forEach((f, i) =>
                        temp.append(`file-${i}`, f, f.name)
                      );
                      setFiles(temp);
                    } else {
                      setFiles(null);
                    }
                  }}
                />
              </Col>
            </Row>
            <Row className='input-row'>
              <Col>
                <input
                  disabled={reCapVer}
                  type='button'
                  id='btnLeadIntakeSubmit'
                  className='hub-button'
                  value='Submit'
                  onClick={handleSubmit}
                />
                <div
                  id='divGenericErrorBanner'
                  className='hub-error-banner'
                  style={{ display: 'none' }}
                >
                  {/* eslint-disable-next-line react/no-unescaped-entities */}
                  <span>This form can't be submitted. Try again later.</span>
                </div>
              </Col>
              <Col>
                <ReCAPTCHA
                  sitekey='6LeJme8nAAAAABgKna5AcQXzHEzR4_cLc2cajgNa'
                  ref={reCap}
                  onChange={verify}
                  id='reCAPTCHA'
                />
              </Col>
            </Row>
            <div id='divHubConfirmation' style={{ display: 'none' }}>
              <div className='hub-confirmation-icon'>
                <svg
                  width='132'
                  height='132'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    d='M66 132A66 66 0 1 1 66 0a66 66 0 0 1 0 132zm0-2A64 64 0 1 0 66 2a64 64 0 0 0 0 128zm-9.9-45.5l39-38.9 1.3 1.5-40.3 40.3-19.5-19.6 1.4-1.4L56 84.5z'
                    fill='currentColor'
                    fillRule='nonzero'
                  />
                </svg>
              </div>
              <span>Your message has been sent.</span>
            </div>
          </Col>
          <Col md={4}>
            <Content title='Office Hours'>
              <p className='m-0'>Monday 7:30AM - 4:30PM</p>
              <p className='m-0'>Tuesday 7:30AM - 4:30PM</p>
              <p className='m-0'>Wednesday 7:30AM - 4:30PM</p>
              <p className='m-0'>Thursday 7:30AM - 4:30PM</p>
              <p className='m-0'>Friday 7:30AM - 4:30PM</p>
              <p className='m-0'>Saturday CLOSED</p>
              <p className='m-0'>Sunday CLOSED</p>
            </Content>
            <div className='mt-4'>
              <Content title='General Information'>
                <p className='m-0'>4333 Washington Ave.</p>
                <p className='m-0'>New Orleans, LA 70125</p>
                <p className='m-0'>
                  Phone: <a href='tel:504-533-0007'>504-533-0007</a>
                </p>
                <p className='m-0'>
                  Email:{' '}
                  <a href='mailto:info@sweeneyrestoration.com'>
                    info@sweeneyrestoration.com
                  </a>
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

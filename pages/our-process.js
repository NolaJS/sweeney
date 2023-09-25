import Head from 'next/head';
import { Col, Container, Row } from 'reactstrap';
import Vimeo from '@u-wave/react-vimeo';
import { createUseStyles } from 'react-jss';
import Lightbox from 'react-image-lightbox';
import { useState } from 'react';
import Content from '../components/Content';
import PageHead from '../components/PageHead';
import 'react-image-lightbox/style.css';

const useStyles = createUseStyles({
  pic: {
    maxWidth: '100%',
  },
  video: {
    '& iframe': {
      '@media (max-width: 480px)': {
        height: 'auto',
      },
      maxWidth: '100%',
    },
    margin: [0, 'auto'],
    textAlign: 'center',
  },
});

function Process() {
  const [open, setOpen] = useState(false);
  const classes = useStyles();
  return (
    <div>
      <Head>
        <title>Our Process | Sweeney Restoration</title>
        <meta property="og:title" content="Our Process | Sweeney Restoration" key="title" />
        <meta name="robots" content="index,follow" />
      </Head>
      <PageHead title="Our Process" img="our-process.jpg" />
      <Container>
        <Content title="Our Process">
          <Row>
            <Col md={6}>
              <ol>
                <li>Client Contact</li>
                <li>In Home Consultation</li>
                <li>Pre-Construction Services Agreement</li>
                <li>Design, Data Gathering and Budget Preparations</li>
                <li>Proposal Presentation</li>
                <li>Contract</li>
                <li>Construction</li>
                <li>Completion and Project Sign Off</li>
              </ol>
            </Col>
            <Col md={6}>
              <button type="button" onClick={() => setOpen(true)}>
                <img src="./process.jpg" alt="our process" className={classes.pic} />
              </button>
              {open && <Lightbox mainSrc="./process.jpg" onCloseRequest={() => setOpen(false)} />}
            </Col>
          </Row>
        </Content>
        <Content title="Customer Communication">
          <Vimeo className={classes.video} video="447571522" height={600} />
        </Content>
      </Container>
    </div>
  );
}

export default Process;

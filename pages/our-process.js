import Head from 'next/head';
import { Container } from 'reactstrap';
import Vimeo from '@u-wave/react-vimeo';
import { createUseStyles } from 'react-jss';
import Content from '../components/Content';
import PageHead from '../components/PageHead';

const useStyles = createUseStyles({
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

const Process = () => {
  const classes = useStyles();
  return (
    <div>
      <Head>
        <title>Our Process | Sweeney Restoration</title>
        <meta property="og:title" content="Our Process | Sweeney Restoration" key="title" />
      </Head>
      <PageHead title="Our Process" img="our-process.jpg" />
      <Container>
        <Content title="Our Process">
          <ol>
            <li>Client Contact</li>
            <li>Client Consultation</li>
            <li>Pre-Construction Services Agreement</li>
            <li>In Home Consultation</li>
            <li>Builder Services Agreement</li>
            <li>Design, Data Gathering, and Budget Preparations</li>
            <li>Proposal Presentation</li>
            <li>Contract</li>
            <li>Construction</li>
            <li>Completion and Project Sign Off</li>
          </ol>
        </Content>
        <Content title="Customer Communication">
          <Vimeo className={classes.video} video="447571522" height={600} />
        </Content>
      </Container>
    </div>
  );
};

export default Process;

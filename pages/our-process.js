import Head from 'next/head';
import { Container } from 'reactstrap';
import Content from '../components/Content';
import PageHead from '../components/PageHead';

const Process = () => (
  <div>
    <Head>
      <title>Our Process | Sweeney Restoration</title>
      <meta property="og:title" content="Our Process | Sweeney Restoration" key="title" />
    </Head>
    <PageHead
      title="Our Process"
      img="https://lirp-cdn.multiscreensite.com/f4423934/dms3rep/multi/opt/header-bg-1920w.jpg"
    />
    <Container>
      <Content title="Our Process">
        <ol>
          <li>Client Content</li>
          <li>In Home Consultation</li>
          <li>Builder Services Agreement</li>
          <li>Design, Data Gathering, and Budget Preparations</li>
          <li>Proposal Presentation</li>
          <li>Contract</li>
          <li>Construction</li>
          <li>Completion and Project Sign Off</li>
        </ol>
      </Content>
      <Content title="Customer Communication" />
    </Container>
  </div>
);

export default Process;

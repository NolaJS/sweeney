import { Row, Col, Container } from 'reactstrap';
import { createUseStyles, useTheme } from 'react-jss';
import classnames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faYelp, faInstagram, faTwitter } from '@fortawesome/fontawesome-free-brands';

const useStyles = createUseStyles((theme) => ({
  hbaImages: {
    filter: 'brightness(0) invert(1)',
    margin: 10,
    maxHeight: 75,
  },
  root: {
    '& a': {
      color: '#fff',
    },
    backgroundColor: theme.palette.accent,
    boxShadow: theme.shadow.bottom,
  },
  social: {
    '& a': {
      color: '#fff',
      fontSize: 25,
      margin: [0, 10],
    },
    '& img': {
      height: 25,
    },
  },
}));

const locale = {
  address: '4333 Washington Ave.',
  address2: 'New Orleans, LA 70125',
  by: 'NolaJS',
  company: 'Sweeney Restoration',
  copyright: 'Copyright',
  design: 'Designed and Built by',
  email: <a href="mailto:info@sweeneyrestoration.com">info@sweeneyrestoration.com</a>,
  phone: <a href="tel:504-533-0007">504-533-0007</a>,
};

function Footer() {
  const theme = useTheme();
  const classes = useStyles({ theme });
  const year = new Date().getFullYear();
  return (
    <Container fluid className={classnames('p-3 text-white', classes.root)}>
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
        <Col md={2}>
          <a href="https://www.hbagno.org/" target="_blank" rel="noopener noreferrer nofollow">
            <img
              className={classes.hbaImages}
              src="hbagno-logo.png"
              alt="home builders association of greater new orleans member"
            />
          </a>
          <a href="https://www.nahb.org/" target="_blank" rel="noopener noreferrer nofollow">
            <img
              className={`${classes.hbaImages} d-inline-block d-md-none`}
              src="nahb-logo.png"
              alt="national association of home builders member"
            />
          </a>
        </Col>
        <Col>
          <div
            className={classnames(
              'd-flex align-items-center justify-content-center',
              classes.social,
            )}
          >
            <a
              href="https://www.facebook.com/SweeneyRestoration/"
              target="_blank"
              rel="noopener noreferrer nofollow"
            >
              <FontAwesomeIcon icon={faFacebook} />
            </a>
            <a
              href="https://www.instagram.com/sweeneyrestoration"
              target="_blank"
              rel="noopener noreferrer nofollow"
            >
              <FontAwesomeIcon icon={faInstagram} />
            </a>
            <a
              href="https://www.yelp.com/biz/sweeney-restoration-new-orleans"
              target="_blank"
              rel="noopener noreferrer nofollow"
            >
              <FontAwesomeIcon icon={faYelp} />
            </a>
            <a
              href="https://twitter.com/sweeneyllc"
              target="_blank"
              rel="noopener noreferrer nofollow"
            >
              <FontAwesomeIcon icon={faTwitter} />
            </a>
          </div>
          <p className="m-0">
            {locale.copyright} {year} {locale.company}
          </p>
          <p className="m-0">
            {locale.design} {locale.by}
          </p>
        </Col>
        <Col md={2} className="d-none d-md-block">
          <a href="https://www.nahb.org/" target="_blank" rel="noopener noreferrer nofollow">
            <img
              className={classes.hbaImages}
              src="nahb-logo.png"
              alt="national association of home builders member"
            />
          </a>
        </Col>
      </Row>
    </Container>
  );
}

export default Footer;

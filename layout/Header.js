import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Container,
} from 'reactstrap';
import { createUseStyles, useTheme } from 'react-jss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faYelp, faTwitter, faInstagram } from '@fortawesome/fontawesome-free-brands';
import classnames from 'classnames';

const useStyles = createUseStyles((theme) => ({
  mainNav: {
    '& > .nav-item > .nav-link': {
      '@media (max-width: 480px)': {
        '&.active': {
          color: '#343a40',
        },
        color: '#212529',
      },
    },
  },
  navbar: {
    '@media (max-width: 480px)': {
      backgroundImage: `linear-gradient(to right, #fff 25%, ${theme.palette.primary}, ${theme.palette.accent})`,
    },
    backgroundImage: `linear-gradient(to right, #fff, ${theme.palette.primary}, ${theme.palette.accent})`,
    boxShadow: theme.shadow.top,
  },
  socialIcon: {
    height: 15,
  },
  topBar: {
    '& a': {
      '&:first-child': {
        marginLeft: 0,
      },
      '@media (max-width: 480px)': {
        fontSize: 14,
      },
      color: theme.palette.topBarNavColors,
      fontSize: 16,
      marginLeft: 15,
      whiteSpace: 'nowrap',
    },
    background: theme.palette.primary,
    borderBottom: '1px solid #031B24',
    padding: [10, 0],
  },
}));

const links = [
  { label: 'Home', to: '/' },
  { label: 'About Us', to: '/about-us' },
  { label: 'Our Process', to: '/our-process' },
  { label: 'Portfolio', to: '/portfolio' },
  { label: 'Architects & Designers', to: '/architects-and-designers' },
  { label: 'Contact Us', to: '/contact-us' },
];

function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const theme = useTheme();
  const classes = useStyles({ theme });
  const router = useRouter();
  const toggle = () => setIsOpen(!isOpen);
  useEffect(() => {
    router.events.on('routeChangeStart', () => {
      setIsOpen(false);
    });
  }, [router.events]);
  return (
    <>
      <Container
        fluid
        className={classnames(
          'px-3 px-lg-5 d-flex justify-content-center justify-content-sm-end',
          classes.topBar,
        )}
      >
        <Link legacyBehavior href="/contact-us">
          <a>Request a Quote</a>
        </Link>
        <Link legacyBehavior href="/customer-login">
          <a>Customer Login</a>
        </Link>
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
        <a href="https://twitter.com/sweeneyllc" target="_blank" rel="noopener noreferrer nofollow">
          <FontAwesomeIcon icon={faTwitter} />
        </a>
      </Container>
      <Navbar dark expand="md" className={classnames('px-5', classes.navbar)}>
        <NavbarBrand href="/">
          <img src="/logo-small.png" alt="" />
        </NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className={classnames('ml-auto', classes.mainNav)} navbar>
            {links.map((l) => (
              <NavItem key={l.to}>
                <Link legacyBehavior href={l.to} passHref>
                  <NavLink active={l.to === router.pathname}>{l.label}</NavLink>
                </Link>
              </NavItem>
            ))}
          </Nav>
        </Collapse>
      </Navbar>
    </>
  );
}

export default Header;

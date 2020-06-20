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
import { faFacebook, faYelp } from '@fortawesome/fontawesome-free-brands';
import classnames from 'classnames';

const useStyles = createUseStyles(theme => ({
  navbar: {
    backgroundImage: `linear-gradient(75deg, ${theme.palette.primary}, ${theme.palette.accent})`,
    boxShadow: theme.shadow.top,
  },
  socialIcon: {
    height: 15,
  },
  topBar: {
    '& a': {
      color: theme.palette.topBarNavColors,
      fontSize: 16,
      marginLeft: 15,
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

const Header = () => {
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
        className={classnames('px-3 px-lg-5 d-flex justify-content-end', classes.topBar)}
      >
        <Link href="/contact-us">Request a Quote</Link>
        <a
          href="https://coconstruct.com/app/default/default.aspx"
          target="_blank"
          rel="noopener noreferrer nofollow"
        >
          Customer Login
        </a>
        <a
          href="https://www.facebook.com/SweeneyRestoration/"
          target="_blank"
          rel="noopener noreferrer nofollow"
        >
          <FontAwesomeIcon icon={faFacebook} />
        </a>
        <a
          href="https://www.yelp.com/biz/sweeney-restoration-new-orleans"
          target="_blank"
          rel="noopener noreferrer nofollow"
        >
          <FontAwesomeIcon icon={faYelp} />
        </a>
        <a
          href="https://www.angieslist.com/companylist/us/la/new-orleans/sweeney-restoration%2C-llc-reviews-2313165.htm"
          target="_blank"
          rel="noopener noreferrer nofollow"
        >
          <img className={classes.socialIcon} src="/angies-list-icon.svg" alt="Angie's list icon" />
        </a>
      </Container>
      <Navbar dark expand="md" className={classnames('px-5', classes.navbar)}>
        <NavbarBrand href="/">
          <img src="/logo-small.png" alt="" />
        </NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="ml-auto" navbar>
            {links.map(l => (
              <NavItem key={l.to}>
                <Link href={l.to} passHref>
                  <NavLink active={l.to === router.pathname}>{l.label}</NavLink>
                </Link>
              </NavItem>
            ))}
          </Nav>
        </Collapse>
      </Navbar>
    </>
  );
};

export default Header;

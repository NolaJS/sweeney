import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';

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
  const router = useRouter();
  const toggle = () => setIsOpen(!isOpen);
  useEffect(() => {
    router.events.on('routeChangeStart', () => {
      setIsOpen(false);
    });
  }, [router.events]);
  return (
    <Navbar color="dark" dark expand="md">
      <NavbarBrand href="/">Sweeney Restoration</NavbarBrand>
      <NavbarToggler onClick={toggle} />
      <Collapse isOpen={isOpen} navbar>
        <Nav className="ml-auto" navbar>
          {links.map(l => (
            <NavItem key={l.to}>
              <Link href={l.to} as={l.as} passHref>
                <NavLink active={l.to === router.pathname}>{l.label}</NavLink>
              </Link>
            </NavItem>
          ))}
        </Nav>
      </Collapse>
    </Navbar>
  );
};

export default Header;

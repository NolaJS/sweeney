import React, { useState } from 'react';
import Link from 'next/link';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';

const links = [
  { label: 'Home', to: '/' },
  { label: 'About Us', to: '/about' },
  { label: 'Our Process', to: '/process' },
  { label: 'Portfolio', to: '/portfolio' },
  { label: 'Architects & Designers', to: '/architects' },
  { label: 'Contact Us', to: '/contact' },
];

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);
  return (
    <Navbar color="light" light expand="md">
      <NavbarBrand href="/">Sweeney Restoration</NavbarBrand>
      <NavbarToggler onClick={toggle} />
      <Collapse isOpen={isOpen} navbar>
        <Nav className="ml-auto" navbar>
          {links.map(l => (
            <NavItem key={l.to}>
              <Link href={l.to}>
                <NavLink>{l.label}</NavLink>
              </Link>
            </NavItem>
          ))}
        </Nav>
      </Collapse>
    </Navbar>
  );
};

export default Header;

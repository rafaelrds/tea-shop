import React from 'react';
import { Nav, NavItem, Navbar, Badge } from 'react-bootstrap';

export default (props) => {
  return (
    <Navbar inverse fixedTop>
      <Navbar.Header>
        <Navbar.Brand>
          <a href="/">Tea Shop</a>
        </Navbar.Brand>
        <Navbar.Toggle />
      </Navbar.Header>
    </Navbar>
  );
}
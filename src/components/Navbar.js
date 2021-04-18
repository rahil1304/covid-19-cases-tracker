import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";

const NavbarComponent = () => {
  return (
    <Navbar bg='dark' variant='dark'>
      <Navbar.Brand href='#'>
        <i class='fas fa-home'></i> Home
      </Navbar.Brand>
      <Nav className='mr-auto'>
        <Nav.Link href='#'>Login</Nav.Link>
        <Nav.Link href='#'>Register</Nav.Link>
      </Nav>
    </Navbar>
  );
};

export default NavbarComponent;

import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { Link } from "react-router-dom";

const NavbarComponent = () => {
  return (
    <Navbar bg='dark' variant='dark'>
      <Navbar.Brand href='/'>
        <i class='fas fa-home'></i> Home
      </Navbar.Brand>
      <Nav className='ml-auto'>
        <Nav.Link href='/login'>Login</Nav.Link>
        <Nav.Link href='/register'>Register</Nav.Link>
      </Nav>
    </Navbar>
  );
};

export default NavbarComponent;

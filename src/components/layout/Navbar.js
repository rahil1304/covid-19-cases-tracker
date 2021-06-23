import React, { Fragment } from "react";
import "bootstrap/dist/css/bootstrap.css";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
// import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logout } from "../../actions/auth";

const NavbarComponent = ({ auth: { isAuthenticated, loading }, logout }) => {
  const authLinks = (
    <Nav className='ml-auto' href='#!' onClick={logout}>
      <Navbar.Brand href='/dashboard'>
        <i className='fas fa-user'> </i>
        <span className='hide-sm'> Dashboard</span>
      </Navbar.Brand>
      <Navbar.Brand href='/'>
        <i className='fas fa-sign-out-alt'></i>
        <span className='hide-sm'> Logout</span>
      </Navbar.Brand>
    </Nav>
  );

  const guestLinks = (
    <Nav className='ml-auto'>
      <Nav.Link href='/login'>Login</Nav.Link>
      <Nav.Link href='/register'>Register</Nav.Link>
    </Nav>
  );

  return (
    <Navbar bg='dark' variant='dark'>
      <Navbar.Brand href='/'>
        <i class='fas fa-home'></i> Home
      </Navbar.Brand>
      {/* <Nav className='ml-auto'>
        <Nav.Link href='/login'>Login</Nav.Link>
        <Nav.Link href='/register'>Register</Nav.Link>
      </Nav> */}
      {!loading && (
        <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
      )}
    </Navbar>
  );
};

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logout })(NavbarComponent);

import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDesktop, faBell, faCog } from '@fortawesome/free-solid-svg-icons';

const Header: React.FC = () => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="mb-4">
      <Container>
        <Navbar.Brand as={Link} to="/">
          <FontAwesomeIcon icon={faDesktop} className="me-2" />
          Mini-Netumo
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">Dashboard</Nav.Link>
            <Nav.Link as={Link} to="/alerts">
              <FontAwesomeIcon icon={faBell} className="me-1" />
              Alerts
            </Nav.Link>
            <Nav.Link as={Link} to="/settings">
              <FontAwesomeIcon icon={faCog} className="me-1" />
              Settings
            </Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link>User@example.com</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header; 
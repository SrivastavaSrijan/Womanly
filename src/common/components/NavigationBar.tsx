import Link from 'next/dist/client/link';
import React from 'react';
import { Container, Nav, Navbar, Stack } from 'react-bootstrap';
import CustomImage from './CustomImage';

export const NavigationBar = () => {
  return (
    <Navbar bg="primary" variant="light" expand="lg" className="w-100">
      <Container fluid>
        <Navbar.Brand>
          <Link href="./">
            <Stack direction="horizontal" className="justify-content-md-center">
              <CustomImage
                path="/favicons/android-chrome-192x192.png"
                classNames="d-inline-block align-top"
                size={56}
              />

              <h6 className="text-black mx-2 my-1">WOMANLY</h6>
            </Stack>
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar" />
        <Navbar.Collapse
          className="justify-content-end text-center"
          id="navbar"
        >
          <Nav>
            <Link href="./" passHref>
              <Nav.Link className="nav-link">Home</Nav.Link>
            </Link>
            <Link href="diagnostics" passHref>
              <Nav.Link className="nav-link"> Diagnostics</Nav.Link>
            </Link>
            <Link href="./" passHref>
              <Nav.Link className="nav-link">About Us</Nav.Link>
            </Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

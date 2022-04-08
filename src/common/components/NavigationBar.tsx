import React, { useEffect, useState } from 'react';
import Link from 'next/dist/client/link';
import { useUser } from '@auth0/nextjs-auth0';
import { Container, Nav, Navbar, Stack, NavDropdown } from 'react-bootstrap';
import CustomImage from './CustomImage';

function NavigationBar() {
  const { user } = useUser();
  const [userName, setUserName] = useState('Test');
  useEffect(() => {
    const userNameSet = (user?.email ?? 'User@gmail.com')
      .replace(/[@].*/, '');
    setUserName(userNameSet);
  }, [user]);
  return (
    <Navbar bg="primary" variant="light" expand="lg" className="w-100">
      <Container fluid>
        <Navbar.Brand>
          <Link href="/">
            <Stack direction="horizontal" className="justify-content-md-center" style={{ cursor: 'pointer' }}>
              <CustomImage path="/favicons/android-chrome-192x192.png" classNames="d-inline-block align-top" size={56} />

              <h6 className="text-white mx-2 my-1 fw-bolder">WOMANLY</h6>
            </Stack>
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar" />
        <Navbar.Collapse className="justify-content-end text-center" id="navbar">
          <Nav>
            <Link href="/" passHref>
              <Nav.Link className="nav-link">Home</Nav.Link>
            </Link>
            <Link href="diagnostics" passHref>
              <Nav.Link className="nav-link"> Diagnostics</Nav.Link>
            </Link>
            <Link href="/" passHref>
              <Nav.Link className="nav-link">About Us</Nav.Link>
            </Link>
            {user ? (
              <NavDropdown title="My Profile" id="nav-dropdown" className="bg-primary" menuVariant="primary" align="end">
                <Stack direction="horizontal" className="justify-content-md-center">
                  <CustomImage
                    path={user.picture ?? ''}
                    classNames="d-inline-block align-top"
                    size={36}
                  />
                  <small className="text-black mx-2 my-1">{ userName }</small>
                </Stack>
                <NavDropdown.Divider className="m-0" />

                <Link href="my-profile" passHref>
                  <NavDropdown.Item className="nav-link">
                    Edit my profile
                  </NavDropdown.Item>
                </Link>
                <NavDropdown.Divider className="m-0" />

                <Link href="/api/auth/logout" passHref>
                  <NavDropdown.Item className="nav-link">
                    Logout
                  </NavDropdown.Item>

                </Link>
              </NavDropdown>

            ) : (
              <Link href="/api/auth/login" passHref>
                <Nav.Link className="nav-link">Login</Nav.Link>
              </Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavigationBar;

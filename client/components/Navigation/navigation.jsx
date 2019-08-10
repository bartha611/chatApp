import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Container,
  Nav,
  NavLink,
  Navbar,
  NavbarBrand,
  NavbarToggler,
  Collapse,
  NavItem
} from "reactstrap";

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div>
      <Container>
        <Navbar color="dark" dark expand="md">
          <NavbarBrand href="/">Flack</NavbarBrand>
          <NavbarToggler onClick={() => setIsOpen(!isOpen)} />
          <Collapse isOpen={isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink tag={Link} to="/login">
                  Login
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink tag={Link} to="/signup">
                  SignUp
                </NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      </Container>
    </div>
  );
}

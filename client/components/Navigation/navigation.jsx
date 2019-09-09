import React, { useState } from "react";
import { Link } from "react-router-dom";
import {useSelector, useDispatch} from 'react-redux';
import {
  Container,
  Nav,
  NavLink,
  Navbar,
  NavbarToggler,
  Collapse,
  NavItem,
} from "reactstrap";
import {logoutUser} from '../../actions/userAction';
import "./navigation.css"


export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const user = useSelector(state => state.user);
  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch(logoutUser());
  }
  return (
    <div>
      <Container fluid id="container">
        <Navbar id="navigation" color="dark" dark expand="md">
          <NavbarToggler onClick={() => setIsOpen(!isOpen)} />
          <Collapse isOpen={isOpen} navbar>
            <Nav className="ml-auto" navbar>
              {!user.authenticated && (
              <NavItem>
                <NavLink tag={Link} to="/login">
                  Login
                </NavLink>
              </NavItem>
              )}
              {!user.authenticated && (
              <NavItem>
                <NavLink tag={Link} to="/signup">
                  SignUp
                </NavLink>
              </NavItem>
)}
              {user.authenticated && (
                <NavItem>
                  <NavLink onClick={() => {handleClick()}}>
                    Logout
                  </NavLink>
                </NavItem>
              )}
            </Nav>
          </Collapse>
        </Navbar>
      </Container>
    </div>
  );
}

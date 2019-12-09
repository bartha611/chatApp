import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Proptypes from "prop-types";
import {
  Container,
  Nav,
  NavLink,
  Navbar,
  NavbarToggler,
  Collapse,
  NavItem,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownItem,
  DropdownMenu
} from "reactstrap";
import "./navigation.css";

export default function Navigation({ history }) {
  const [isOpen, setIsOpen] = useState(false);
  const user = useSelector(state => state.user);
  const { teams } = useSelector(state => state.team);
  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch({
      type: "LOAD_USER",
      operation: "LOGOUT"
    });
  };
  return (
    <div>
      <Container fluid id="container">
        <Navbar id="navigation" color="dark" dark expand="md">
          <NavbarToggler onClick={() => setIsOpen(!isOpen)} />
          <Collapse isOpen={isOpen} navbar>
            <Nav className="mr-auto">
              <NavItem>
                <NavLink tag={Link} to="/">
                  Flack
                </NavLink>
              </NavItem>
            </Nav>
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
                  <NavLink
                    onClick={() => {
                      handleClick();
                    }}
                  >
                    Logout
                  </NavLink>
                </NavItem>
              )}
              {user.authenticated && (
                <NavItem>
                  <NavLink tag={Link} to="/createteam">
                    Create Team
                  </NavLink>
                </NavItem>
              )}
              {user.authenticated && (
                <UncontrolledDropdown nav inNavbar>
                  <DropdownToggle nav caret>
                    Teams
                  </DropdownToggle>
                  <DropdownMenu right>
                    {teams.map(tm => {
                      return (
                        <DropdownItem
                          onClick={() => history.push(`/${tm.shortid}`)}
                        >
                          {tm.name}
                        </DropdownItem>
                      );
                    })}
                  </DropdownMenu>
                </UncontrolledDropdown>
              )}
            </Nav>
          </Collapse>
        </Navbar>
      </Container>
    </div>
  );
}

Navigation.propTypes = {
  history: Proptypes.shape({
    push: Proptypes.func.isRequired
  }).isRequired
};

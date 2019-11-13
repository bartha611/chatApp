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
  // Dropdown,
  // DropdownToggle,
  // DropdownMenu,
  // DropdownItem
} from "reactstrap";
import "./navigation.css"


export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  // const [dropdownOpen, setDropdownOpen] = useState(false);
  // const team = useSelector(state => state.team);
  const user = useSelector(state => state.user);
  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch({
      type: 'LOAD_USER',
      operation: 'LOGOUT'
    });
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
              {user.authenticated && (
                <NavItem>
                  <NavLink tag={Link} to="/createteam">
                    Create Team
                  </NavLink>
                </NavItem>
              )}
              {/* {user.authenticated && (
                <Dropdown isOpen={dropdownOpen} toggle={setDropdownOpen(true)}>
                  <DropdownToggle caret>
                    <DropdownMenu>
                      <DropdownItem>
                        <NavLink tag={Link} to="/create">
                          Create Team
                        </NavLink>
                      </DropdownItem>
                      {team.team.map(tm => {
                        return (
                          <DropdownItem>
                            <NavLink tag={Link} to={`/${tm.shortid}`}>
                              {tm.name}
                            </NavLink>
                          </DropdownItem>
                        )
                      })}
                    </DropdownMenu>
                  </DropdownToggle>
                </Dropdown>
              )} */}
            </Nav>
          </Collapse>
        </Navbar>
      </Container>
    </div>
  );
}

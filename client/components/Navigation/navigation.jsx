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
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";
import {logoutUser} from '../../actions/userAction';
import "./navigation.css"

const teams = [
  "team 1",
  "team 2",
  "team 3",
  "team 3",
  "team 3",
  "team 3",
  
]

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [dropDownOpen, setDropdown] = useState(false);
  const user = useSelector(state => state.user);
  // const team = useSelector(state => state.team);
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
            <Nav>
              <Dropdown id="dropdown" isOpen={dropDownOpen} toggle={()=>setDropdown(!dropDownOpen)}>
                <DropdownToggle caret color="dark">
                  Dropdown
                </DropdownToggle>
                <DropdownMenu>
                  {teams.map(tm => {
                    return (
                      <DropdownItem>{tm}</DropdownItem>
                    )
                  })}
                </DropdownMenu>
              </Dropdown>
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

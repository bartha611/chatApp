import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  Nav,
  NavLink,
  Navbar,
  NavbarToggler,
  Collapse,
  NavItem,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownItem,
  DropdownMenu,
} from "reactstrap";
import { fetchAuth } from "../state/ducks/auth";

const Navigation = () => {
  const history = useHistory();
  const [isOpen, setIsOpen] = useState(false);
  const { teams } = useSelector((state) => state.teams);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(fetchAuth("/api/user/signup", "POST", "LOGOUT", null, history));
  };

  return (
    <div className="h-navigation">
      <Navbar className="h-full" id="navigation" color="dark" dark expand="md">
        <NavbarToggler onClick={() => setIsOpen(!isOpen)} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto text-white">
            <NavLink href="/">Flack</NavLink>
          </Nav>
          <Nav className="ml-auto" navbar>
            {!user && (
              <NavItem className="cursor-pointer">
                <NavLink href="/login">Login</NavLink>
              </NavItem>
            )}
            {!user && (
              <NavItem className="cursor-pointer">
                <NavLink href="/signup">SignUp</NavLink>
              </NavItem>
            )}
            {user && (
              <NavItem className="cursor-pointer">
                <NavLink
                  onClick={() => {
                    handleClick();
                  }}
                >
                  Logout
                </NavLink>
              </NavItem>
            )}
            {user && (
              <NavItem>
                <NavLink href="/createteam">Create Team</NavLink>
              </NavItem>
            )}
            {user && (
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                  Teams
                </DropdownToggle>
                <DropdownMenu right>
                  {teams.map((tm) => {
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
    </div>
  );
};

export default Navigation;

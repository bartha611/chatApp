import React, { Component } from "react";
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

class Navigation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false
    };
    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  render() {
    return (
      <div>
        <Container>
          <Navbar color="dark" dark expand="md">
            <NavbarBrand href="/">Flack</NavbarBrand>
            <NavbarToggler onClick={this.toggle} />
            <Collapse isOpen={this.state.isOpen} navbar>
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
}

export default Navigation;

import React, { Component } from "react";
import { Label, Form, FormGroup, Input, Container, Button } from "reactstrap";
import Navigation from "./../Navigation/navigation.jsx";
import axios from "axios";
import "./signup.css";

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      disabled: true
    };
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(e) {
    this.setState(
      {
        [e.target.name]: e.target.value
      },
      () => {
        this.setState({
          disabled: this.state.password !== this.state.confirmPassword
        });
      }
    );
  }
  handleSubmit() {
    const { username, email, password } = this.state;
    axios({
      method: "post",
      url: "http://localhost:3000/user/register",
      data: {
        username: username,
        email: email,
        password: password
      }
    })
      .then(response => {
        console.log(response);
        if(response.status === 200) {
          
        }
      })
      .catch(err => {
        console.log(err);
      });
  }
  render() {
    return (
      <div className="Login">
        <Container>
          <Navigation />
          <div className="signupForm">
            <h2 className="mb-5 text-center">Sign-Up</h2>
            <Form>
              <FormGroup>
                <Label for="username">Username</Label>
                <Input
                  id="username"
                  type="text"
                  placeholder="Enter Username"
                  onChange={this.handleChange}
                  name="username"
                />
              </FormGroup>
              <FormGroup>
                <Label for="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter Email"
                  onChange={this.handleChange}
                  name="email"
                />
              </FormGroup>
              <FormGroup>
                <Label for="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="********"
                  onChange={this.handleChange}
                  name="password"
                />
              </FormGroup>
              <FormGroup>
                <Label for="confirmPassword">Confirm Password</Label>
                <Input
                  id="confirm"
                  type="password"
                  placeholder="********"
                  onChange={this.handleChange}
                  name="confirmPassword"
                />
              </FormGroup>
              <Button
                id = "submit"
                disabled={this.state.disabled}
                onClick={this.handleSubmit.bind(this)}
              >
                Submit
              </Button>
            </Form>
          </div>
        </Container>
      </div>
    );
  }
}
export default Signup;

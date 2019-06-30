import React, { Component } from "react";
import "./login.css";
import Navigation from "./../Navigation/navigation.jsx";
import axios from "axios";
import { Form, FormGroup, Input, Label, Button, Col } from "reactstrap";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: ""
    };
    this.handleChange = this.handleChange.bind(this);
  }
  componentDidMount() {
    document.addEventListener("keydown", this.handleEnter.bind(this));
  }
  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleEnter.bind(this));
  }
  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }
  handleSubmit(e) {
    e.preventDefault();
    const { username, password } = this.state;
    axios({
      url: "/login",
      method: "POST",
      contentType: "application/json",
      data: JSON.stringify({ username: username, password: password }),
      success: data => console.log(data),
      error: () => console.log("error")
    });
  }
  handleEnter(e) {
    if (e.keyCode === 13) {
      this.handleSubmit(e);
    }
  }
  render() {
    return (
      <div className="Login">
        <Navigation />
        <div className="login-form mt-5">
          <h2 className="mb-5 text-center">Login</h2>
          <Form>
            <FormGroup>
              <Label for="username">Username</Label>
              <Input
                onChange={this.handleChange}
                type="text"
                placeholder="Enter Password"
                name="username"
              />
            </FormGroup>
            <FormGroup>
              <Label for="password">Password</Label>
              <Input
                onChange={this.handleChange}
                type="password"
                placeholder="********"
                name="password"
              />
            </FormGroup>
            <Button
              className="mt-4"
              onKeyDown={this.handleEnter.bind(this)}
              tabIndex="0"
              color="secondary"
              size="lg"
              block
              onClick={this.handleSubmit.bind(this)}
            >
              Submit
            </Button>
          </Form>
        </div>
      </div>
    );
  }
}
export default Login;

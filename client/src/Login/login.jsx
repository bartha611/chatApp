import React, { Component } from "react";
import "./login.css";
import $ from 'jquery';
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
      method: 'post',
      url: '/user/login',
      data: {username: username, password: password}
    })
    .catch(error => {
      console.log(error)
    })
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
                id = "username"
                onChange={this.handleChange}
                type="text"
                placeholder="Enter Password"
                name="username"
              />
            </FormGroup>
            <FormGroup>
              <Label for="password">Password</Label>
              <Input
                id = "password"
                onChange={this.handleChange}
                type="password"
                placeholder="********"
                name="password"
              />
            </FormGroup>
            <Button
              id = "submit"
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

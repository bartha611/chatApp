import React, { Component } from 'react';
import {
  Label,
  Form,
  FormGroup,
  Input,
  Container,
  Button,
} from 'reactstrap';
import Navigation from './../Navigation/navigation.jsx';
import "./signup.css"

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      disabled: true
    }
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(e) {
    this.setState({
      [e.target.name]:e.target.value
    }, () => {
      this.setState({
        disabled: this.state.password !== this.state.confirmPassword
      })
    })
  }
  handleSubmit() {
    console.log("Hello there")
  }
  render() {
    return (
      <div className = "Login">
        <Container>
          <Navigation />
          <h2 className = "mb-5">Signup</h2>
          <div className="signupForm">
            <Form>
              <FormGroup>
                <Label for = "username">Username</Label>
                <Input type = "text" placeholder = "Enter Username" onChange = {this.handleChange} name = "username"></Input>
              </FormGroup>
              <FormGroup>
                <Label for = "email">Email</Label>
                <Input type = "email" placeholder = "Enter Email" onChange = {this.handleChange} name = "email"></Input>
              </FormGroup>
              <FormGroup>
                <Label for = "password">Password</Label>
                <Input type = "password" placeholder = "********" onChange = {this.handleChange} name = "password"></Input>
              </FormGroup>
              <FormGroup>
                <Label for =  "confirmPassword">Confirm Password</Label>
                <Input type = "password" placeholder = "********" onChange = {this.handleChange} name = "confirmPassword"></Input>
              </FormGroup>
              <Button disabled = {this.state.disabled} onClick = {this.handleSubmit.bind(this)}>Submit</Button>
            </Form>
          </div>
        </Container>
      </div>
    )
  }
}
export default Signup

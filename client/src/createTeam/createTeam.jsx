import React, { Component } from "react";
import { Input, Form, FormGroup, Button } from "reactstrap";

function validateEmail(email) {
  var re = /^\S+@\S+\.\S+$/;
  return re.test(email);
}

class CreateTeam extends Component {
  constructor(props) {
    super(props);
    this.state = {
      team: "",
      email1: "",
      email2: "",
      email3: "",
      email4: ""
    };
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(e) {
    this.setState(
      {
        [e.target.name]: e.target.value
      },
      () => {

        console.log(e.target.value);
      }
    );
  }
  handleEnter(e) {
    if (e.keyCode === 13) {
      e.preventDefault();
      this.handleSubmit();
    }
  }
  handleSubmit() {
    axios.post('http://localhost.com:3000/')
  }
  render() {
    return (
      <div>
        <Form>
          <FormGroup>
            <Input
              type="text"
              id="team"
              placeholder="Enter Teamname"
              onChange={this.handleChange}
              name="team"
            />
          </FormGroup>
          <FormGroup>
            <Input
              id="email1"
              type="email"
              placeholder="example@gmail.com"
              onChange={this.handleChange}
              name="email1"
            />
          </FormGroup>
          <FormGroup>
            <Input
              id="email2"
              type="email"
              placeholder="example@gmail.com"
              onChange={this.handleChange}
              name="email2"
            />
          </FormGroup>
          <FormGroup>
            <Input
              id="email3"
              type="email"
              placeholder="example@gmail.com"
              onChange={this.handleChange}
              name="email3"
            />
          </FormGroup>
          <FormGroup>
            <Input
              id="email4"
              type="email"
              placeholder="example@gmail.com"
              onChange={this.handleChange}
              name="email4"
            />
          </FormGroup>
          <Button
            block
            id="submit"
            onClick={this.handleSubmit.bind(this)}
            onKeyDown={this.handleEnter.bind(this)}
            disabled={this.state.disabled}
          />
        </Form>
      </div>
    );
  }
}

export default CreateTeam;

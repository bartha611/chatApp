import React, { Component } from "react";
import axios from "axios";
import { Input, Form, FormGroup, Button, Label, Container } from "reactstrap";

class AddTeamMembers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email1: "",
      email2: "",
      email3: "",
      email4: ""
    };
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }
  handleSubmit() {
    let data = [];
    for (let value of Object.values(this.state)) {
      if (value) {
        data.push(value);
      }
    }
    console.log(data);
    axios.post("http://localhost:3000/userTeam/create", {
      data: data,
      team: this.props.team
    });
  }
  render() {
    return (
      <div>
        <Container>
          <Form>
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
            <Button onClick={this.handleSubmit.bind(this)}>Submit</Button>
          </Form>
        </Container>
      </div>
    );
  }
}

export default AddTeamMembers;

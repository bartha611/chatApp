import React, { Component } from "react";
import io from "socket.io-client";
import { Row, Col, Form, Input, Container, Button } from "reactstrap";
import "./dashboard.css";
import TextArea from "react-textarea-autosize";
import $ from "jquery";

let socket = io.connect("http://localhost:3000");

var array = ["general", "random"];

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input: "",
      messages: []
    };
    socket.on("message", msg => {
      console.log("hello");
      this.setState(
        {
          messages: [...this.state.messages, msg]
        },
        () => {
          console.log(this.state.messages);
        }
      );
    });
  }
  handleEnter(e) {
    if (e.keyCode === 13) {
      e.preventDefault();
      this.setState({
        messages: [...this.state.messages, this.state.input]
      }, () => {socket.emit("input", this.state.input);})
    }
  }
  handleChange(e) {
    this.setState({
      input: e.target.value
    });
  }
  handleSubmit() {
    socket.emit("input", this.state.input);
  }
  render() {
    var navlinks = array.map((channel, index) => {
      return (
        <li className="channels" key={index}>
          {channel}
        </li>
      );
    });
    var messages = this.state.messages.map((message, index) => {
      console.log("rendered");
      return <div className="message">{message}</div>;
    });
    return (
      <div id="main">
        <nav id="sidebar">
          <ul id="channelList">
            <h5 id="channelTitle">Channels</h5>
            {navlinks}
          </ul>
        </nav>
        <div id="messageBox">
          <div id="chat">{messages}</div>
          <div id="client">
            <div id="formbox">
              <Form>
                <TextArea
                  name="message"
                  id="textbox"
                  max
                  onChange={this.handleChange.bind(this)}
                  onKeyDown={this.handleEnter.bind(this)}
                />
              </Form>
              <Button
                onClick={this.handleSubmit.bind(this)}
                className="btn btn-success"
              >
                Submit
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Dashboard;

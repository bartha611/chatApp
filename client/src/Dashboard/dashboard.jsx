import React, { Component } from "react";
import io from "socket.io-client";
import { Row, Col, Form, Input, Container, Button } from "reactstrap";
import "./dashboard.css";
import TextArea from "react-textarea-autosize";
import $ from "jquery";

let socket = io.connect("http://localhost:3000/chat");

var array = ["general", "random"];

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input: "",
      messages: []
    };
    socket.on("message", msg => {
      this.setState(
        {
          messages: [...this.state.messages, msg]
        },
        () => {
          console.log(this.state.messages);
          console.log(this.state.input);
        }
      );
    });
  }
  componentDidMount() {
    const { teamId } = this.props.match.params.teamId;
    console.log(teamId);
  }
  handleEnter(e) {
    if (e.keyCode === 13) {
      e.preventDefault();
      this.setState(
        {
          messages: [...this.state.messages, this.state.input]
        },
        () => {
          socket.emit("input", this.state.input);
        }
      );
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
          <div id="footer">
            <div id="formbox">
              <Form>
                <TextArea
                  name="message"
                  id="textbox"
                  onChange={this.handleChange.bind(this)}
                  onKeyDown={this.handleEnter.bind(this)}
                />
              </Form>
              <button id = "button" onClick={this.handleSubmit.bind(this)}>Submit</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Dashboard;

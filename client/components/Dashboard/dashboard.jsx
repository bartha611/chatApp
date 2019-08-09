import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import io from "socket.io-client";
import { Form } from "reactstrap";
import "./dashboard.css";
import TextArea from "react-textarea-autosize";
import { useSocket } from "./../Hooks";

var array = ["general", "random"];

function Dashboard(props) {
  const [input, setInput] = useState("");
  const dispatch = useDispatch();
  const [message, sendToSocket] = useSocket();
  return (
    <div id="main">
      <nav id="sidebar">
        <ul id="channelList">
          <h5 id="channelTitle">Channels</h5>
          {array.map((channel, index) => {
            return (
              <li className="channels" key={index}>
                {channel}
              </li>
            );
          })}
        </ul>
      </nav>
      <div id="messageBox">
        <div id="chat">
          {message.map((msg, index) => {
            return (
              <div className="message" key={index}>
                {msg}
              </div>
            );
          })}
        </div>
        <div id="footer">
          <div id="formbox">
            <Form>
              <TextArea
                name="message"
                id="textbox"
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => {
                  if (e.keyCode === 13) {
                    e.preventDefault();
                    sendToSocket(input);
                    setInput("");
                  }
                }}
              />
            </Form>
            <button
              id="button"
              onClick={() => {
                sendToSocket(input);
                setInput("");
              }}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;

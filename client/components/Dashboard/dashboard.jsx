import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
// import io from "socket.io-client";
import { Form } from "reactstrap";
import "./dashboard.css";
import TextArea from "react-textarea-autosize";
import { useSocket } from "../Hooks";
import {addMessage} from '../../actions/messageAction';


function Dashboard() {
  const [input, setInput] = useState("");
  const dispatch = useDispatch();
  const [message, sendToSocket] = useSocket();
  const handleSubmit = () => {
    dispatch(addMessage(input));
  }
  useEffect(() => {
    const handleEnter = (e) => {
      if(e.keyCode === 13) {
        e.preventDefault();
        handleSubmit();
      }
    }
    window.addEventListener('keydown', handleEnter);
    return () => window.removeEventListener('keydown', handleEnter);
  })
  return (
    <div id="main">
      <nav id="sidebar">
        <ul id="channelList">
          <h5 id="channelTitle">Channels</h5>
        </ul>
      </nav>
      <div id="messageBox">
        <div id="chat">
          {message.map(msg => {
            return (
              <div className="message">
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
              type="submit"
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

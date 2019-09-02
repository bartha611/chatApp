import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from 'react-redux';
import io from "socket.io-client";
import { Form } from "reactstrap";
import "./dashboard.css";
import TextArea from "react-textarea-autosize";
import Navigation from '../Navigation/navigation';
import {addMessage} from '../../actions/messageAction';

const client = io.connect('http://localhost:3000');
const channelId = 1

const totalTeams = [
  "team 1",
  "team 2",
  "team 3",
  "team 4",
  "team 5",
  "team 6",
  "team 7",
  "team 8",
  "team 9",
  "team 10",
  "team 11",
  "team 12",
  "team 13",
]
// const content = [
//   {user: "adam", time:"8:30 PM", message:"shdlkfjsadlkfdsajfkdsajfkajsdf"},
//   {user: "eric", time:"9:30 PM", message:"nuntana sucks"},
//   {user: "nuntana", time:"9:45 PM", message:"I agree.  I do suck"}
// ]

function Dashboard() {
  const [input, setInput] = useState("");
  const message = useSelector(state => state.messages);
  // const team = useSelector(state => state.team);
  const messageEnd = useRef(null);
  const dispatch = useDispatch();
  const handleSubmit = () => {
    client.emit("input", {input, channelId});
    setInput('');
  }
  useEffect(() => {
    messageEnd.current.scrollIntoView({behavior: "smooth"});
    console.log(message.messages);
  }, [message])
  useEffect(() => {
    client.emit("join", channelId);
    client.on("message", msg => {
      dispatch(addMessage(msg))
    })
    return () => client.off("message");
  }, []);
  return (
    <div id="main">
      <Navigation />
      <div id="board">
        <nav id="sidebar">
          <ul id="teamId">
            <div className="dropdown">
              <a href="#" className="btn btn-secondary container dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Team</a>
              <div className="dropdown-menu" id="scrollable-menu">
                {totalTeams.map(tm => {
                  return (
                    <a href="#" className="dropdown-item">{tm}</a>
                  )
                })}
              </div>
            </div>
          </ul>
          <ul className="channelList">
            <h5 id="channelTitle">Channels</h5>
                
          </ul>
        </nav>
        <div id="messageBox">
          <div id="chat">
            {message.messages.map(msg => {
            return (
              <div className="message">
                <span style={{color: "white"}} id="user">
                  <b>{msg.user}</b>
                  {' '}
                </span>
                <span style={{color: "grey"}} id="time">{msg.date}</span>
                <div>
                  {msg.message}
                </div>
                <hr style={{backgroundColor: "grey"}} />
              </div>
            );
          })}
            <div id="messageEnd" ref={messageEnd} />
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
                  if (e.keyCode === 13)
                  {
                    e.preventDefault();
                    handleSubmit();
                  }
                }}
                />
              </Form>
              <button
                type="submit"
                id="button"
                className="btn btn-success"
                onClick={() => {
                handleSubmit();
              }}
              >
              Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;

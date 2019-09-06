import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from 'react-redux';
import io from "socket.io-client";
import { Form } from "reactstrap";
import "./dashboard.css";
import TextArea from "react-textarea-autosize";
import Navigation from '../Navigation/navigation';
import {addMessageToSocket, addMessage} from '../../actions/messageAction';

const client = io.connect('http://localhost:3000');
const channelId = Math.floor(Math.random()*2);


function Dashboard() {
  const [input, setInput] = useState("");
  const message = useSelector(state => state.messages);
  console.log(message.messages);
  const team = useSelector(state => state.team);
  console.log(team.team[0]);
  const messageEnd = useRef(null);
  const dispatch = useDispatch();
  const handleSubmit = () => {
    dispatch(addMessageToSocket(channelId, input, client));
    setInput('');
  }
  useEffect(() => {
    messageEnd.current.scrollIntoView({behavior: "smooth"});
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
                {team.team[0].map(tm => {
                  return (
                    <a href="#" className="dropdown-item">{tm.name}</a>
                  )
                })}
              </div>
            </div>
          </ul>
          <ul className="channelList">
            <div className="channel">
              <div id="channelTitle">Channels</div>
              <div id="addChannel"><i className="fa fa-plus-circle" /></div>
            </div>
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
                <span style={{color: "grey"}} id="time">{msg.time}</span>
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
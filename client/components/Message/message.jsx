import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from 'moment-timezone'
import PropTypes from "prop-types";
import { Alert } from "reactstrap";
import "./message.css";
import createBoard from "../../helper/createBoard";

import Footer from "../footer/footer";

const MessageBoard = ({ channel }) => {
  const [input, setInput] = useState("");
  const dispatch = useDispatch();
  const messages = useSelector(state => state.messages);
  const user = useSelector(state => state.user);
  const { username } = user;
  const messageEnd = useRef(null);
  const handleSubmit = () => {
    const zone = moment.tz.guess();
    dispatch({
      type: "LOAD_MESSAGE",
      operation: "CREATE",
      data: { input, channel, username, zone }
    });
    setInput("");
  };
  useEffect(() => {
    console.log("hello there")
    dispatch({
      type: "LOAD_MESSAGE",
      operation: "READ",
      data: { channel, zone: moment.tz.guess() }
    });
    dispatch({ type: "STORE_JOIN", event: "join", channel });
  }, [channel]);
  useEffect(() => {
    messageEnd.current.scrollIntoView({ behavior: "smooth" });
  }, [messages.messages]);
  return (
    <div id="messageBox">
      <div id="messageNavigation">
        <button
          type="button"
          onClick={() => {
            dispatch({
              type: "LOAD_USER",
              operation: "LOGOUT"
            });
          }}
          className="btn btn-primary"
        >
          Logout
        </button>
      </div>
      <div id="chat">
        {createBoard(messages)}
        {messages.error && (
          <div id="alert">
            <Alert>Error in sending message</Alert>
          </div>
        )}
        <div id="messageEnd" ref={messageEnd} />
      </div>
      <Footer handleSubmit={handleSubmit} setInput={setInput} input={input} />
    </div>
  );
};

MessageBoard.propTypes = {
  socket: PropTypes.shape({
    emit: PropTypes.func.isRequired,
    on: PropTypes.func.isRequired,
    off: PropTypes.func.isRequired
  }).isRequired,
  channel: PropTypes.string.isRequired
};

export default MessageBoard;

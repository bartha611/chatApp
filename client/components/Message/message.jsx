import React, { useState, useRef, useEffect } from "react";
import moment from 'moment'
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import { Alert } from "reactstrap";
// import TextArea from "react-textarea-autosize";
import { fetchMessages, sendMessage } from "../../actions/messageAction";
import "./message.css";

import Footer from "../footer/footer";

import { logoutUser } from "../../actions/userAction";

const MessageBoard = ({ channel }) => {
  const [input, setInput] = useState("");
  const dispatch = useDispatch();
  const messages = useSelector(state => state.messages);
  const user = useSelector(state => state.user);
  const messageEnd = useRef(null);
  const handleSubmit = async () => {
    await dispatch(sendMessage(input, channel, user.username));
    setInput("");
  };
  useEffect(() => {
    const fetch = async () => {
      await dispatch(fetchMessages(channel));
    };
    dispatch({ type: "STORE_JOIN", event: "join", channel });
    fetch();
  }, []);
  useEffect(() => {
    messageEnd.current.scrollIntoView({ behavior: "smooth" });
  }, [messages.messages]);
  return (
    <div id="messageBox">
      <div id="messageNavigation">
        <button
          type="button"
          onClick={() => {
            dispatch(logoutUser())
            
          }}
          className="btn btn-primary"
        >
          Logout
        </button>
      </div>
      <div id="chat">
        {messages.messages &&
          messages.messages.map(msg => {
            const [date, time, meridian] = msg.createdat.split(' ');
            const messageTime = `${time} ${meridian}`.replace(/^0/,'');
            console.log(msg.createdat);
            const messageDate = moment(date).format("MMMM D, YYYY");
            console.log(messageDate)
            return (
              <div className="messageBlock">
                <span className="user">
                  <b>{msg.username}</b>
                  {" "}
                </span>
                <span className="date">{messageTime}</span>
                <div className="message">{msg.message}</div>
                <hr style={{ backgroundColor: "grey" }} />
              </div>
            );
          })}
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

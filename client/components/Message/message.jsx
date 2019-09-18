import React, { useState, useRef, useEffect } from "react";
import { useDispatch } from "react-redux";
import PropTypes from 'prop-types'
import { Form } from "reactstrap";
import TextArea from "react-textarea-autosize";
import { addMessage } from "../../actions/messageAction";
import "./message.css";

import { logoutUser } from '../../actions/userAction'

const MessageBoard = ({ socket, message, channelId }) => {
  const [input, setInput] = useState("");
  const dispatch = useDispatch();
  const messageEnd = useRef(null);
  const handleSubmit = () => {
    socket.emit("input", { input, channelId });
    setInput("");
  };
  useEffect(() => {
    socket.emit("join", channelId);
    socket.on("message", msg => {
      dispatch(addMessage(msg));
    });
    return () => socket.off("message");
  }, []);
  useEffect(() => {
    messageEnd.current.scrollIntoView({ behavior: 'smooth'})
  }, [message])
  return (
    <div id="messageBox">
      <div id="messageNavigation">
        <button type="submit" onClick={() => dispatch(logoutUser())} className="btn btn-primary" id="logout">Logout</button>
      </div>
      <div id="chat">
        {message.messages &&
          message.messages.map(msg => {
            return (
              <div className="messageBlock">
                <span className="user">
                  <b>{msg.user}</b>
                  {" "}
                </span>
                <span className="date">{msg.date}</span>
                <div className="message">{msg.message}</div>
                <hr style={{ backgroundColor: "grey" }} />
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
                if (e.keyCode === 13) {
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
  );
};

MessageBoard.propTypes = {
  socket: PropTypes.shape({
    emit: PropTypes.func.isRequired,
    on: PropTypes.func.isRequired,
    off: PropTypes.func.isRequired
  }).isRequired,
  message: PropTypes.shape({
    messages: PropTypes.arrayOf(PropTypes.shape({
      user: PropTypes.string,
      date: PropTypes.string,
      message: PropTypes.string
    }))
  }).isRequired,
  channelId: PropTypes.number.isRequired
}

export default MessageBoard;

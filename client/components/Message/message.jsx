import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import { Alert } from "reactstrap";
// import TextArea from "react-textarea-autosize";
import { addMessage, fetchMessages } from "../../actions/messageAction";
import "./message.css";

import Footer from "../footer/footer";

import { logoutUser } from "../../actions/userAction";

const MessageBoard = ({ socket, channel }) => {
  const [input, setInput] = useState("");
  const dispatch = useDispatch();
  const messages = useSelector(state => state.messages);
  console.log(messages);
  const messageEnd = useRef(null);
  const handleSubmit = async () => {
    await dispatch(addMessage(input));
    if (!messages.error) {
      socket.emit("input", { input, channel });
    }
    setInput("");
  };
  useEffect(() => {
    const fetch = async () => {
      await dispatch(fetchMessages(channel));
    }
    fetch();
  }, []);
  useEffect(() => {
    socket.emit("join", channel);
    socket.on("message", msg => {
      dispatch(addMessage(msg));
    });
    return () => socket.off("message");
  }, []);
  useEffect(() => {
    messageEnd.current.scrollIntoView({ behavior: "smooth" });
  }, [messages.messages]);
  return (
    <div id="messageBox">
      <div id="messageNavigation">
        <button
          type="submit"
          onClick={() => dispatch(logoutUser())}
          className="btn btn-primary"
          id="logout"
        >
          Logout
        </button>
      </div>
      <div id="chat">
        {messages.messages &&
          messages.messages.map(msg => {
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
        {messages.error && (
          <div id="alert">
            <Alert>Error in sending message</Alert>
          </div>
        )}
        <div id="messageEnd" ref={messageEnd} />
      </div>
      <Footer 
        handleSubmit={handleSubmit} 
        setInput={setInput} 
        input={input}
      />
      {/* <div id="footer">
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
      </div> */}
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

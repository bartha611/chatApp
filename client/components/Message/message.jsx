import React, { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Form } from "reactstrap";
import TextArea from "react-textarea-autosize";
import { addMessage } from "../../actions/messageAction";
import "./message.css";

const channelId = Math.floor(Math.random() * 3);

const MessageBoard = ({ socket }) => {
  const [input, setInput] = useState("");
  const message = useSelector(state => state.message);
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
  return (
    <div id="messageBox">
      <div id="chat">
        {message.messages.map(msg => {
          return (
            <div className="message">
              <span style={{ color: "white" }} id="user">
                <b>{msg.user}</b>
              </span>
              <span style={{ color: "grey" }} id="time">
                {msg.time}
              </span>
              <div>{msg.message}</div>
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

export default MessageBoard;

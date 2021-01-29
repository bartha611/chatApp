import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { Alert } from "reactstrap/dist/reactstrap";
import createBoard from "./CreateBoard";

const Chat = () => {
  const messageEnd = useRef(null);
  const { messages, error } = useSelector((state) => state.messages);

  useEffect(() => {
    messageEnd.current.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="overflow-y-scroll">
      {createBoard(messages)}
      {error && (
        <div id="alert">
          <Alert color="danger">{error}</Alert>
        </div>
      )}
      <div id="messageEnd" ref={messageEnd} />
    </div>
  );
};

export default Chat;

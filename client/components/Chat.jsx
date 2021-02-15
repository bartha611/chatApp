import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { Alert } from "reactstrap/dist/reactstrap";
import Message from "./Message";

const Chat = () => {
  const messageEnd = useRef(null);
  const [isDropdown, setIsDropdown] = useState(false);
  const { messages, error } = useSelector((state) => state.messages);

  const formatDate = (date) => {
    return new Date(date)
      .toDateString()
      .split(" ")
      .slice(1, 4)
      .join(" ");
  };

  useEffect(() => {
    messageEnd.current.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="overflow-y-scroll" id="chat">
      {messages.map((message, index) => {
        const divider =
          index === 0 ||
          formatDate(messages[index - 1].created_at) !==
            formatDate(message.created_at) ? (
            <h4 className="border-b-2 text-center font-bold">
              <span>{formatDate(message.created_at)}</span>
            </h4>
          ) : (
            ""
          );
        return (
          <div className="mt-2 break-words" key={message.id} id={message.id}>
            {divider}
            <Message
              message={message}
              isDropdown={isDropdown}
              setIsDropdown={setIsDropdown}
            />
          </div>
        );
      })}
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

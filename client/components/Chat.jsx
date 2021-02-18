import React, { useState } from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { Alert } from "reactstrap/dist/reactstrap";
import { usePaginate } from "../lib/usePaginate";
import Message from "./Message";

const Chat = ({ messageEnd }) => {
  const [isDropdown, setIsDropdown] = useState(false);
  const { messages, error } = useSelector((state) => state.messages);

  const formatDate = (date) => {
    return new Date(date)
      .toDateString()
      .split(" ")
      .slice(1, 4)
      .join(" ");
  };

  usePaginate();

  return (
    <div className="overflow-y-scroll" id="chat" style={{ minHeight: "550px" }}>
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

Chat.propTypes = {
  messageEnd: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.elementType }),
  ]),
};

export default Chat;

import React, { useState } from "react";
import PropTypes from "prop-types";
import ReactHTMLParser from "react-html-parser";
import ViewProfile from "./ViewProfile";
import EditProfile from "./EditProfile";

const Message = ({ message }) => {
  const [isView, setIsView] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  const formatTime = (date) => {
    return new Date(date)
      .toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      })
      .replace(/^0+/, "");
  };

  return (
    <div className="flex flex-row py-2 hover:bg-gray-100 relative">
      <input
        type="image"
        onFocus={() => setIsView(true)}
        onBlur={() => setIsView(false)}
        className="rounded-sm w-8 h-8"
        src={message.user.avatar}
        alt="User avatar"
      />
      <div className="ml-2 w-auto">
        <span className="font-bold">
          {message.user.displayName
            ? message.user.displayName
            : message.user.fullName}
        </span>
        <span className="ml-2 text-gray-500 text-sm">
          {formatTime(message.created_at)}
        </span>
        <div>{ReactHTMLParser(message.message)}</div>
      </div>
      {isView && (
        <ViewProfile
          profile={message.user}
          setIsEdit={setIsEdit}
          scrollHeight={document.getElementById("chat").scrollHeight}
        />
      )}
      {isEdit && <EditProfile isOpen={isEdit} setIsOpen={setIsEdit} />}
    </div>
  );
};

Message.propTypes = {
  message: PropTypes.shape({
    id: PropTypes.number.isRequired,
    message: PropTypes.string.isRequired,
    created_at: PropTypes.string.isRequired,
    user: PropTypes.shape({
      username: PropTypes.string.isRequired,
      avatar: PropTypes.string.isRequired,
      fullName: PropTypes.string.isRequired,
      displayName: PropTypes.string,
    }).isRequired,
  }).isRequired,
};

export default Message;

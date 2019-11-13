import React from "react";
import { useDispatch } from "react-redux";
import PropTypes from 'prop-types'
import "./message.css";

// import subcomponents
import Chat from "../Chat/Chat"
import Footer from "../footer/footer"

const MessageBoard = ({ channel }) => {
  const dispatch = useDispatch();
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
      <Chat />
      <Footer channel={channel} />
    </div>
  );
};

MessageBoard.propTypes = {
  channel: PropTypes.string.isRequired
}


export default MessageBoard;

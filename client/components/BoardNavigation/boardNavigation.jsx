import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button } from 'reactstrap'

const BoardNavigation = () => {
  const { messages } = useSelector(state => state.messages);
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch({
      type: "LOAD_USER",
      operation: "LOGOUT"
    })
  }
  return (
    <div id="boardNavigation" className="d-flex justify-content-end border-bottom">
      {messages.length > 0 && (
        <div id="channelInfo" className="d-flex flex-column w-50">
          <h5>
            <b>{messages[0].name || "channel"}</b>
          </h5>
          <h6>{messages[0].description || "channel description"}</h6>
        </div>
      )}
    <Button className="m-2" color="primary" onClick={() => handleLogout()}>Logout</Button>
    </div>
  );
};

export default BoardNavigation;

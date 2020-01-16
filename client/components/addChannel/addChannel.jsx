import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWindowClose } from "@fortawesome/free-solid-svg-icons";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { Alert } from "reactstrap";

import "./addchannel.css";

const AddChannel = ({ team, setChannel, history }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const channelState = useSelector(state => state.channel);
  const dispatch = useDispatch();
  const handleSubmit = () => {
    dispatch({
      type: "LOAD_CHANNEL",
      operation: "CREATE",
      data: { name, team, description },
      navigation: ({ shortid }) => {
        setChannel(false);
        return `/${team}/${shortid}`;
      },
      history
    });
  };
  useEffect(() => {
    const handleEnter = e => {
      if (e.keyCode === 13) {
        e.preventDefault();
        handleSubmit();
      }
    };
    window.addEventListener("keydown", handleEnter);
    return () => window.removeEventListener("keydown", handleEnter);
  });
  return (
    <div className="col-md-10 mt-5">
      <div id="icon" onClick={() => setChannel(false)}>
        <FontAwesomeIcon icon={faWindowClose} />
      </div>
      <div id="addchannel" className="col-md-6">
        <h2>
          <b>Create Channel</b>
        </h2>
        <form className="mt-4">
          <div className="form-group">
            <label className="labels">Channel</label>
            <input
              type="text"
              className="form-control"
              placeholder="Channel"
              onChange={e => {
                console.log(name);
                setName(e.target.value);
              }}
            />
          </div>
          <div className="form-group">
            <label className="labels">Description</label>
            <input
              type="text"
              className="form-control"
              placeholder="optional description"
              onChange={e => setDescription(e.target.value)}
            />
          </div>
        </form>
        <button
          onClick={() => {
            handleSubmit();
          }}
          className="btn btn-primary"
          type="submit"
        >
          Submit
        </button>
        {channelState.error && (
          <Alert className="mt-4" color="danger">
            Error in creating channel
          </Alert>
        )}
      </div>
    </div>
  );
};

AddChannel.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired,
  team: PropTypes.string.isRequired,
  setChannel: PropTypes.func.isRequired
};

export default withRouter(AddChannel);

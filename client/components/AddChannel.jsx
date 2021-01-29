import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import { Alert } from "reactstrap";
import { fetchChannels } from "../state/ducks/channels";

const AddChannel = ({ team }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const { error } = useSelector((state) => state.channels);
  const dispatch = useDispatch();

  const handleSubmit = async () => {
    await dispatch(
      fetchChannels(`/api/teams/${team}/channels`, "POST", "CREATE", {
        name,
        teamId: team,
        description,
      })
    );
  };

  useEffect(() => {
    const handleEnter = (e) => {
      if (e.keyCode === 13) {
        e.preventDefault();
        handleSubmit();
      }
    };
    window.addEventListener("keydown", handleEnter);
    return () => window.removeEventListener("keydown", handleEnter);
  });

  return (
    <div>
      <form className="mt-4">
        <div className="form-group">
          <label className="labels">Channel</label>
          <input
            type="text"
            className="form-control"
            placeholder="Channel"
            onChange={(e) => {
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
            onChange={(e) => setDescription(e.target.value)}
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
      {error && (
        <Alert className="mt-4" color="danger">
          Error in creating channel
        </Alert>
      )}
    </div>
  );
};

AddChannel.propTypes = {
  team: PropTypes.string.isRequired,
};

export default AddChannel;

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Modal,
  ModalHeader,
  ModalBody,
  Alert,
  FormGroup,
  Label,
  Input,
  Form,
  Button,
} from "reactstrap";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import { fetchChannels } from "../state/ducks/channels";

const AddChannel = ({ team, isOpen, setIsOpen }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const { error } = useSelector((state) => state.channels);
  const dispatch = useDispatch();
  const history = useHistory();

  const handleSubmit = async () => {
    await dispatch(
      fetchChannels(
        `/api/teams/${team}/channels`,
        "POST",
        "CREATE",
        {
          name,
          teamId: team,
          description,
        },
        history
      )
    );
    setIsOpen(false);
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
    <Modal isOpen={isOpen} toggle={() => setIsOpen(false)}>
      <ModalHeader toggle={() => setIsOpen(false)}>Add Channel</ModalHeader>
      <ModalBody>
        <Form>
          <FormGroup>
            <Label>Name</Label>
            <Input
              type="text"
              placeholder="Channel Name"
              value={name || ""}
              onChange={(e) => setName(e.target.value)}
            />
          </FormGroup>
          <FormGroup>
            <Label>Description</Label>
            <Input
              type="text"
              placeholder="Description"
              value={description || ""}
              onChange={(e) => setDescription(e.target.value)}
            />
          </FormGroup>
        </Form>
        <Button onClick={handleSubmit}>Submit</Button>
        {error && (
          <Alert className="mt-4" color="danger">
            Error in creating channel
          </Alert>
        )}
      </ModalBody>
    </Modal>
  );
};

AddChannel.propTypes = {
  team: PropTypes.string.isRequired,
  isOpen: PropTypes.bool.isRequired,
  setIsOpen: PropTypes.func.isRequired,
};

export default AddChannel;

import React, { useState } from "react";
import { Modal, ModalBody, ModalHeader, Input, Container } from "reactstrap";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";
import api from "../state/utils/api";

const AddTeamMembers = ({ setIsOpen, isOpen }) => {
  const [email, setEmail] = useState(null);
  const {
    currentTeam: { shortid },
  } = useSelector((state) => state.teams);

  const handleKeyup = async (search) => {
    const response = await api.get(`/api/user?search=${search}`);
    setEmail(response.data.user);
  };

  const handleClick = async () => {
    await api.post(`/api/teams/${shortid}/profiles`, email);
    setIsOpen(false);
  };

  return (
    <Modal isOpen={isOpen} toggle={() => setIsOpen(false)}>
      <ModalHeader toggle={() => setIsOpen(false)}>Add Team Member</ModalHeader>
      <ModalBody>
        <Container>
          <Input
            id="email1"
            type="text"
            placeholder="username"
            onKeyUp={(event) => handleKeyup(event.target.value)}
            name="email1"
          />
          {email && (
            <div
              className="border-2 text-left p-2 hover:bg-gray-200 cursor-pointer"
              onClick={handleClick}
            >
              {email.email}
            </div>
          )}
        </Container>
      </ModalBody>
    </Modal>
  );
};

AddTeamMembers.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  setIsOpen: PropTypes.func.isRequired,
};

export default AddTeamMembers;

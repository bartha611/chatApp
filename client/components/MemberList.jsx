import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Modal, ModalBody, ModalHeader } from "reactstrap";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";
import { faUserAlt } from "@fortawesome/free-solid-svg-icons";

const MemberList = ({ isOpen, setIsOpen }) => {
  const { members } = useSelector((state) => state.members);

  const randomColor = () => {
    const colors = ["purple", "blue", "green", "orange", "red", "brown"];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  return (
    <Modal className="w-96 p-2" isOpen={isOpen}>
      <ModalHeader toggle={() => setIsOpen(false)}>Members</ModalHeader>
      <ModalBody className="max-h-96 overflow-y-scroll">
        {members &&
          members.map((member) => {
            return (
              <div
                key={member.id}
                className="flex items-center py-2 hover:bg-gray-100 px-4 cursor-pointer"
              >
                <div className="h-7 w-7 text-y flex bg-purple-50 justify-center items-end">
                  <FontAwesomeIcon
                    icon={faUserAlt}
                    color={randomColor()}
                    size="lg"
                  />
                </div>
                <span className="font-semibold font-sans ml-2 text-sm">
                  {member.fullName}
                </span>
              </div>
            );
          })}
      </ModalBody>
    </Modal>
  );
};

MemberList.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  setIsOpen: PropTypes.func.isRequired,
};

export default MemberList;

import React from "react";
import { Modal, ModalBody, ModalHeader } from "reactstrap";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";

const MemberList = ({ isOpen, setIsOpen }) => {
  const { members } = useSelector((state) => state.members);

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
                <div className="h-7 w-7">
                  <img
                    className="h-full w-full rounded-sm"
                    src={member.avatar}
                    alt={`${member.fullName} profile avatar`}
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

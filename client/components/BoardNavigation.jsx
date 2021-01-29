import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSelector } from "react-redux";
import { faUserAlt } from "@fortawesome/free-solid-svg-icons";
import PropTypes from "prop-types";

const BoardNavigation = ({ setIsOpen }) => {
  const { currentChannel } = useSelector((state) => state.channels);
  const { members } = useSelector((state) => state.members);

  return (
    <div className="flex flex-row items-center py-2 px-2 border-b-2">
      {currentChannel && (
        <div className="d-flex flex-column w-50">
          <span className="block font-bold text-sm">
            # {currentChannel.name}
          </span>
          <span className="block text-gray-600 text-xs">
            {currentChannel.description}
          </span>
        </div>
      )}
      <div className="ml-auto flex">
        <div
          className="h-6 w-6 flex bg-purple-50 justify-center items-end cursor-pointer"
          onClick={() => {
            console.log("hello there");
            setIsOpen(true);
          }}
        >
          <FontAwesomeIcon icon={faUserAlt} size="lg" color="purple" />
        </div>
        <span>{members.length}</span>
      </div>
    </div>
  );
};

BoardNavigation.propTypes = {
  setIsOpen: PropTypes.func.isRequired,
};

export default BoardNavigation;

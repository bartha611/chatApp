import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSelector } from "react-redux";
import { faChevronLeft, faUserAlt } from "@fortawesome/free-solid-svg-icons";
import PropTypes from "prop-types";

const BoardNavigation = ({ setIsOpen, setSidebarOpen, sidebarOpen }) => {
  const { currentChannel } = useSelector((state) => state.channels);
  const { members } = useSelector((state) => state.members);

  return (
    <div className="flex flex-row items-center border-b-2">
      {currentChannel && (
        <div className="flex flex-row justify-around">
          <span
            className="cursor-pointer flex justify-center items-center h-7 w-7 hover:bg-gray-100 sm:hidden"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            <FontAwesomeIcon icon={faChevronLeft} size="lg" />
          </span>
          <div className="d-flex flex-column">
            <span className="block font-bold text-sm">
              # {currentChannel.name}
            </span>
            <span className="block text-gray-600 text-xs">
              {currentChannel.description}
            </span>
          </div>
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
  sidebarOpen: PropTypes.bool.isRequired,
  setSidebarOpen: PropTypes.func.isRequired,
};

export default BoardNavigation;

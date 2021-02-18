import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import {
  Dropdown,
  DropdownMenu,
  DropdownToggle,
  DropdownItem,
} from "reactstrap";
import PropTypes from "prop-types";

const Sidebar = ({ setChannel, team, setMember }) => {
  const history = useHistory();
  const { channels } = useSelector((state) => state.channels);
  const { teams, currentTeam } = useSelector((state) => state.teams);
  const { members } = useSelector((state) => state.members);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggle = () => setDropdownOpen(!dropdownOpen);

  return (
    <div className="bg-indigo-900 text-gray-300 w-60 font-serif h-dashboard-screen">
      <ul className="sidebar__teams">
        <Dropdown isOpen={dropdownOpen} toggle={toggle}>
          <DropdownToggle
            className="w-full bg-transparent text-center border-b-2"
            caret
          >
            {currentTeam.name}
          </DropdownToggle>
          <DropdownMenu>
            {teams.map((tm) => {
              return (
                <a href={`/${tm.shortid}`} className="sidebar__team">
                  <DropdownItem>{tm.name}</DropdownItem>
                </a>
              );
            })}
          </DropdownMenu>
        </Dropdown>
      </ul>
      <div className="flex group flex-row justify-between">
        <div className="pl-4">Channel</div>
        <div
          className="hidden group-hover:block bg-transparent pr-4 cursor-pointer"
          onClick={() => {
            setChannel(true);
          }}
        >
          <FontAwesomeIcon icon={faPlusCircle} />
        </div>
      </div>
      <ul className="flex flex-col overflow-y-scroll max-h-60">
        {channels.map((ch) => {
          return (
            <div>
              <div onClick={() => history.push(`/${team}/${ch.shortid}`)}>
                <span className="block pl-10 py-1 hover:no-underline hover:bg-gray-600 hover:bg-transparent cursor-pointer">
                  {ch.name}
                </span>
              </div>
            </div>
          );
        })}
      </ul>
      <div className="mt-4 flex group justify-between">
        <div className="pl-4">Members</div>
        <div
          className="hidden group-hover:block pr-4 cursor-pointer"
          onClick={() => {
            setMember(true);
          }}
        >
          <FontAwesomeIcon icon={faPlusCircle} />
        </div>
      </div>
      <ul className="max-h-60 overflow-y-scroll flex flex-col">
        {members.map((m) => {
          return (
            <div className="block pl-10 py-1 cursor-pointer hover:bg-gray-600">
              {m.fullName}
            </div>
          );
        })}
      </ul>
    </div>
  );
};

Sidebar.propTypes = {
  setChannel: PropTypes.func.isRequired,
  team: PropTypes.string.isRequired,
  setMember: PropTypes.func.isRequired,
};

export default Sidebar;

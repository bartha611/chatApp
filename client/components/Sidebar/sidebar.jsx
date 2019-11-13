import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import {
  Dropdown,
  DropdownMenu,
  DropdownToggle,
  DropdownItem
} from "reactstrap";
import "./sidebar.css";
import PropTypes from "prop-types";

const Sidebar = ({ setChannel, team, setMember }) => {
  const channels = useSelector(state => state.channel);
  const teams = useSelector(state => state.team);
  const members = useSelector(state => state.member);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggle = () => setDropdownOpen(!dropdownOpen);
  return (
    <div id="sidebar">
      <ul id="teamList">
        <Dropdown isOpen={dropdownOpen} toggle={toggle}>
          <DropdownToggle caret>Team</DropdownToggle>
          <DropdownMenu>
            {teams.teams.map(tm => {
              return (
                <a href={`/${tm.shortid}`} className="dropdown-item">
                  <DropdownItem>{tm.name}</DropdownItem>
                </a>
              );
            })}
          </DropdownMenu>
        </Dropdown>
      </ul>
      <ul id="channels">
        <div className="titleGroup">
          <div className="title">Channel</div>
          <div
            id="addChannel"
            onClick={() => {
              setChannel(true);
            }}
          >
            <FontAwesomeIcon icon={faPlusCircle} />
          </div>
        </div>
        {channels.channels.map(ch => {
          return (
            <Link className="links" to={`/${team}/${ch.shortid}`}>
              {ch.name}
            </Link>
          );
        })}
      </ul>
      <ul id="members">
        <div className="titleGroup">
          <div className="title">Members</div>
          <div
            id="addMember"
            onClick={() => {
              console.log("hello there member");
              setMember(true);
            }}
          >
            <FontAwesomeIcon icon={faPlusCircle} />
          </div>
        </div>
        {members.members.map(m => {
          return <h5>{m.username}</h5>;
        })}
      </ul>
    </div>
  );
};

Sidebar.propTypes = {
  setChannel: PropTypes.func.isRequired,
  team: PropTypes.string.isRequired,
  setMember: PropTypes.func.isRequired
};

export default Sidebar;

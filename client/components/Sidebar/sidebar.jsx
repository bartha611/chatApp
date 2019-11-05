import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons'
import { Dropdown, DropdownMenu, DropdownToggle } from 'reactstrap'
import "./sidebar.css";
import PropTypes from "prop-types";

const Sidebar = ({ setChannel, team, setMember }) => {
  const dispatch = useDispatch();
  const channels = useSelector(state => state.channel);
  const teams = useSelector(state => state.team);
  const members = useSelector(state => state.members);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggle = () => setDropdownOpen(!dropdownOpen);
  useEffect(() => {
    dispatch({
      type: "LOAD_CHANNEL",
      operation: "READ",
      data: { team }
    });
    dispatch({
      type: "LOAD_MEMBERS",
      operation: "READ",
      data: { team }
    })
  }, []);
  return (
    <div id="sidebar">
      <ul id="teamList">
        <div data-toggle="dropdown">
          <div className="title">
            Team
            <i className="fa fa-caret-down" style={{ color: "AAAAAA" }} />
          </div>
          <div id="scrollable-menu" className="dropdown-menu col-sm-12">
            {teams.team.map(tm => {
              return (
                <a href="/login" className="dropdown-item">
                  {tm.name}
                </a>
              );
            })}
          </div>
        </div>
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
            <Link
              className="links"
              to={`/${team}/${ch.shortid}`}
            >
              {ch.name}
            </Link>
          );
        })}
      </ul>
      <ul id="members">
        <div className="title">Members</div>
        <div id="addMember" onClick={() => setMember(true)}>
          <FontAwesomeIcon icon={faPlusCircle} />
        </div>
      </ul>
    </div>
  );
};

Sidebar.propTypes = {
  setChannel: PropTypes.func.isRequired,
  team: PropTypes.string.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired,
  setMember: PropTypes.func.isRequired
};

export default withRouter(Sidebar);

import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux'
import "./sidebar.css";
import PropTypes from 'prop-types'

import { fetchChannels } from '../../actions/channelAction'


const Sidebar = ({ setChannel, team }) => {
  const dispatch = useDispatch();
  const channels = useSelector(state => state.channel);
  const teams = useSelector(state => state.team);
  const fetchTeamChannels = async () => {
    await dispatch(fetchChannels(team));
  }
  useEffect(() => {
    fetchTeamChannels();
  }, [])
  return (
    <div>
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
          <div id="titleGroup">
            <div className="title">Channel</div>
            <div id="addChannel" onClick={() => {setChannel(true)}}><i className="fa fa-plus-circle" /></div>
          </div>
          {channels.channels.map(ch => {
            return (
              <div className="links">{ch.name}</div>
            );
          })}
        </ul>

      </div>
    </div>
  );
};

Sidebar.propTypes = {
  setChannel: PropTypes.func.isRequired,
  team: PropTypes.string.isRequired,
}

export default Sidebar;

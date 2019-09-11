import React from "react";
import "./sidebar.css";
import PropTypes from 'prop-types'

const Sidebar = ({ channel, setChannel, team, channelList }) => {
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
              {team.map(tm => {
                return (
                  <a href="/login" className="dropdown-item">
                    {tm}
                  </a>
                );
              })}
            </div>
          </div>
        </ul>
        <ul id="channels">
          <div className="title">Channel</div>
          {channelList.map(ch => {
            return (
              <div>{ch}</div>
            );
          })}
          <button onClick={() => setChannel(!channel)} type="button" className="btn btn-primary">Click me bitch</button>
        </ul>
      </div>
    </div>
  );
};

Sidebar.propTypes = {
  channel: PropTypes.bool.isRequired,
  setChannel: PropTypes.func.isRequired,
  team: PropTypes.string.isRequired,
  channelList: PropTypes.arrayOf(PropTypes.string).isRequired,
}

export default Sidebar;

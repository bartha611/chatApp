import React from "react";
import { useSelector } from "react-redux";
import "./sidebar.css";

import Navigation from "../Navigation/navigation";

const channels = [];
const team = [];
for (let k = 0; k < 20; k += 1) {
  channels.push(`channel ${String(k)}`);
  team.push(`Team ${String(k)}`);
}
channels.push("alksdjflksafjdsa;lkfjsa;lkdjfd;lkjsad");

const Sidebar = () => {
  const teamState = useSelector(state => state.team);
  console.log(teamState);
  // const channels = useSelector(state => state.channel);
  return (
    <div>
      <Navigation />
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
          {channels.map(ch => {
            return (
              <a className="links" href="/login">
                {ch}
              </a>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;

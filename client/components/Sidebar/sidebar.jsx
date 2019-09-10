import React from "react";
import "./sidebar.css";

const Sidebar = ({ addChannel, setAddChannel, team, channels }) => {
  const handleClick = () => {
    console.log(addChannel);
    setAddChannel(!addChannel);
    console.log(addChannel)
  }
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
          {channels.map(ch => {
            return (
              <div>{ch}</div>
            );
          })}
          <button onClick={() => {handleClick()}} type="button" className="btn btn-primary">Click me bitch</button>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;

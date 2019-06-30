import React, { Component } from 'react';
import "./sidebar.css"
import {
  Navbar,
  Nav,
  li,
  NavLink
} from 'reactstrap';


var channels = ["general", "random"];


class Sidebar extends Component {
  render() {
    var navlinks = this.props.channels.map((channel,index) => {
      return (
        <li className = "channels" key = {index}>
          <span className = "channel">{channel}</span>
        </li>
      )
    })
    return (
      <div>
        <nav id = "sidebar">
          <ul class = "channelList">
            {navlinks}
          </ul>
        </nav>
      </div>
    )
  }
}

export default Sidebar;
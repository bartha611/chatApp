import React, { useState} from "react";
import "./dashboard.css";
import PropTypes from 'prop-types'

// import components
import MessageBoard from "../Message/message";
import Sidebar from "../Sidebar/sidebar";
import AddChannel from "../addChannel/addChannel"


function Dashboard({ match }) {
  const [channel, setChannel] = useState(false);
  return (
    <div>
      {!channel && (
        <div id="board">
          <Sidebar
            setChannel={setChannel} 
            team={match.params.teamName}
          />
          <MessageBoard
            channel={match.params.channelName} 
          />
        </div>
      )}
      {channel && (
        <AddChannel 
          setChannel={setChannel} 
          team={match.params.teamName}
        />
      )}
    </div>
  );
}

Dashboard.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      teamName: PropTypes.string.isRequired,
      channelName: PropTypes.string.isRequired
    }).isRequired
  }).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired
}



export default Dashboard;

import React, { useState} from "react";
import { useSelector} from "react-redux";
import io from "socket.io-client";
import "./dashboard.css";
import PropTypes from 'prop-types'

// import components
import MessageBoard from "../Message/message";
import Sidebar from "../Sidebar/sidebar";
import AddChannel from "../addChannel/addChannel"

const client = io.connect("http://localhost:3000");
const channelId = Math.floor(Math.random() * 2);

function Dashboard({ match }) {
  const message = useSelector(state => state.messages);
  const [channel, setChannel] = useState(false);
  return (
    <div>
      {!channel && (
        <div id="board">
          <Sidebar
            channel={channel} 
            setChannel={setChannel} 
            team={match.params.teamName}
          />
          <MessageBoard
            socket={client} 
            channelId={channelId} 
            message={message}
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
      teamName: PropTypes.string.isRequired
    }).isRequired
  }).isRequired
}



export default Dashboard;

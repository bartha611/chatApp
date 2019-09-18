import React, { useState, useEffect } from "react";
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

function Dashboard({ match}) {
  const message = useSelector(state => state.messages);
  const teams = useSelector(state => state.team)
  const [channel, setChannel] = useState(false);
  useEffect(() => {
    console.log(teams);
  }, [])
  return (
    <div>
      {!channel && (
        <div id="board">
          <Sidebar
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
  }).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired
}



export default Dashboard;

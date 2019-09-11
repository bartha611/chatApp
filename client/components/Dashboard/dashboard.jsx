import React, { useState } from "react";
import { useSelector } from "react-redux";
import io from "socket.io-client";
import "./dashboard.css";

// import components
import MessageBoard from "../Message/message";
import Sidebar from "../Sidebar/sidebar";
import AddChannel from "../addChannel/addChannel"

const client = io.connect("http://localhost:3000");
const channelId = Math.floor(Math.random() * 2);
const teamName = "shit";

const channels = [];
for (let k = 0; k < 20; k++) {
  channels.push(`Channel ${String(k)}`);
}

function Dashboard() {
  const message = useSelector(state => state.messages);
  const [channel, setChannel] = useState(false);
  const team = useSelector(state => state.team);
  return (
    <div>
      {!channel && (
        <div id="board">
          <Sidebar
            channel={channel} 
            setChannel={setChannel} 
            team={team.team} 
            channelList={channels}
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
          team={teamName}
        />
      )}
    </div>
  );
}

export default Dashboard;

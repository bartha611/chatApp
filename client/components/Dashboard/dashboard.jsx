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

const channels = [];
for (let k = 0; k < 20; k++) {
  channels.push(`Channel ${String(k)}`);
}

function Dashboard() {
  const message = useSelector(state => state.messages);
  const [addChannel, setAddChannel] = useState(false);
  const team = useSelector(state => state.team);
  return (
    <div>
      {!addChannel && (
        <div id="board">
          <Sidebar
            addChannel={addChannel} 
            setAddChannel={setAddChannel} 
            team={team.team} 
            channels={channels}
          />
          <MessageBoard
            socket={client} 
            channelId={channelId} 
            message={message}
          />
        </div>
      )}
      {addChannel && (
        <AddChannel
          addChannel={addChannel} 
          setAddChannel={setAddChannel} 
          team
        />
      )}
    </div>
  );
}

export default Dashboard;

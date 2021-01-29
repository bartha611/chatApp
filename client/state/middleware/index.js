import io from "socket.io-client";
import * as actions from "../ducks/messages/messageSlice";

const socketMiddleware = ({ dispatch, getState }) => {
  const socket = io.connect();
  socket.on("message", (data) => {
    dispatch(actions.socketCreateMessage(data));
  });

  return (next) => (action) => {
    if (action.type === "messages/createMessage") {
      const { shortid } = getState().channels.currentChannel;
      socket.emit("input", { shortid, ...action.payload });
    } else if (action.type === "STORE_JOIN") {
      console.log("jalksjflkdsajfds");
      socket.emit("join", action.channel);
    }
    return next(action);
  };
};

export default socketMiddleware;

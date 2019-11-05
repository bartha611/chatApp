import io from "socket.io-client";

const socketMiddleware = ({ dispatch, getState }) => {
  const socket = io.connect("http://localhost:3000");
  socket.on("message", data => {
    console.log("hello there message socket");
    dispatch({
      type: "MESSAGE_CREATE",
      payload: data
    });
    console.log(getState());
  });
  return next => action => {
    if (action.type === "MESSAGE_CREATE") {
      console.log("message has been created");
      socket.emit("input", action.payload);
    } else if (action.type === "STORE_JOIN") {
      console.log(`joining in middleware ${action.channel}`);
      socket.emit("join", action.channel);
    }
    return next(action);
  };
};

export default socketMiddleware;

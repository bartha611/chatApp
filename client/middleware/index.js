import io from "socket.io-client";

const socketMiddleware = ({ dispatch, getState }) => {
  const socket = io.connect("http://localhost:3000");
  socket.on("message", data => {
    console.log(data);
    dispatch({
      type: "ADD_MESSAGES_RECEIVED",
      payload: data
    });
    console.log(getState());
  });
  return next => action => {
    if (action.type === "ADD_MESSAGE_RECEIVED") {
      socket.emit("input", action.payload);
    }
    return next(action);
  };
};

export default socketMiddleware;

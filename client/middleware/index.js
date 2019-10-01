import axios from "axios";
import io from "socket.io-client";

const fetchData = store => {
  const socket = io.connect("http://localhost:3000");
  socket.on("message", data => {
    console.log("you got it right");
    store.dispatch({
      type: "ADD_MESSAGE_RECEIVED",
      payload: data
    });
  });
  return next => action => {
    if (!action.verb) {
      return next(action);
    }
    const { verb, type, endpoint, payload, operation } = action;
    next({
      type: `${type}_REQUEST`
    });
    console.log(store.getState());
    return axios({
      method: verb,
      url: endpoint,
      data: payload
    })
      .then(response => {
        next({
          type: !operation
            ? `${type}_RECEIVED`
            : `${operation}_${type}_RECEIVED`,
          payload: response.data
        });
        if (action.event) {
          console.log("hello there!!");
          socket.emit(action.event, action.payload);
        }
        console.log(store.getState());
      })
      .catch(err => {
        console.log(err);
        next({
          type: `${type}_FAILURE`
        });
        console.log(store.getState());
      });
  };
};

export default fetchData;

import axios from "axios";
import io from "socket.io-client";

const fetchData = store => {
  const socket = io.connect("http://localhost:3000");
  socket.on("message", data => {
    console.log("you got it right");
    store.dispatch({
      type: "ADD_MESSAGES_RECEIVED",
      payload: data
    });
    console.log(store.getState());
  });
  return next => action => {
    if (!action.verb) {
      if (action.event) {
        socket.emit(action.event, action.channel);
      }
      return next(action);
    }
    const { verb, type, endpoint, payload, operation } = action;
    store.dispatch({
      type: `${type}_REQUEST`
    });
    console.log(store.getState());
    return axios({
      method: verb,
      url: endpoint,
      data: payload
    })
      .then(response => {
        store.dispatch({
          type: !operation
            ? `${type}_RECEIVED`
            : `${operation}_${type}_RECEIVED`,
          payload: response.data
        });
        if (action.event) {
          socket.emit(action.event, action.payload);
        }
        console.log(store.getState());
        return;
      })
      .catch(err => {
        console.log(err);
        store.dispatch({
          type: `${type}_FAILURE`
        });
        console.log(store.getState());
      });
  };
};

export default fetchData;

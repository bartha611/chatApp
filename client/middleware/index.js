import axios from "axios";
import io from 'socket.io-client'

const fetchData = store => {
  const socket = io.connect("http://localhost:3000");
  socket.on("message", data => {
    store.dispatch({
      type: 'ADD_MESSAGE_RECEIVED',
      payload: data
    })
  })
  return next => action => {
    if(action.event) {
      socket.emit(action.event, action.channel)
      console.log(`attempted to join channel ${action.channel}`)
    }
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

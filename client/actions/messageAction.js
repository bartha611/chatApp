import Axios from "axios";
import * as types from '../constants/messageTypes';


export function fetchMessages(channelId, userId) {
  return async dispatch => {
    dispatch({ type: types.FETCH_MESSAGES_BEGIN});
    try {
      const response = await Axios.get('http:localhost:3000/messages', {
        channelId,
        userId
      })
      dispatch({type: types.FETCH_MESSAGES_END, payload: response.data });
      return response;
    } catch(err) {
      dispatch({ type: types.FETCH_MESSAGES_FAILURE});
      return err;
    }
  }
}
export const addMessageToSocket = (channelId, messageToSend, socket) => {
  return dispatch => {
    socket.emit("input", {messageToSend, channelId});
    dispatch({type: types.ADD_MESSAGE, payload: messageToSend });
  }}
export const addMessage = (message) => {
  return {
    type: types.ADD_MESSAGE,
    payload: message
  }
}
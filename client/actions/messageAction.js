import axios from "axios";
import * as types from "../constants/messageTypes";

export function fetchMessages(channelId, userId) {
  return async dispatch => {
    dispatch({ type: types.FETCH_MESSAGES_BEGIN });
    try {
      const response = await axios.get("http://localhost:3000/messages", {
        channelId,
        userId
      });
      dispatch({ type: types.FETCH_MESSAGES_END, payload: response.data });
      return response;
    } catch (err) {
      dispatch({ type: types.FETCH_MESSAGES_FAILURE });
      return err;
    }
  };
}
export const addMessage = message => {
  return async dispatch => {
    dispatch({type: types.FETCH_MESSAGES_BEGIN });
    try {
      const response = await axios.post("http://localhost:3000/messages/create", {
        message
      })
      dispatch({ type: types.ADD_MESSAGE, payload: response.data})
    } catch(err) {
      dispatch({ type: types.FETCH_MESSAGES_FAILURE})
    }
  }
};

import axios from "axios";
import * as types from "../constants/channelTypes";

export const addChannel = (name, team, description) => {
  return async dispatch => {
    try {
      const response = await axios.post(
        "http://localhost:3000/channel/create",
        {
          name,
          team,
          description
        }
      );
      dispatch({ type: types.ADD_CHANNEL_SUCCESS, payload: response.data });
    } catch (err) {
      dispatch({ type: types.ADD_CHANNEL_FAILURE });
    }
  };
};

export const fetchChannels = team => {
  return async dispatch => {
    try {
      const response = await axios.get("http:localhost:3000/channel/read", {
        team
      });
      dispatch({ type: types.FETCH_CHANNEL, payload: response.data });
    } catch (err) {
      dispatch({ type: types.ADD_CHANNEL_FAILURE });
    }
  };
};

import * as types from "../constants/channelTypes";

const initalState = {
  channels: [],
  loading: false,
  error: false
};

const channelReducer = (state = initalState, action) => {
  switch (action.type) {
    case types.CHANNEL_REQUEST:
      return {
        ...state,
        loading: true,
        error: false
      };
    case types.ADD_CHANNEL_RECEIVED:
      return {
        ...state,
        loading: false,
        error: false,
        channels: [...state.channels, action.payload]
      };
    case types.CHANNEL_FAILURE:
      return {
        ...state,
        loading: false,
        error: true
      };
    case types.CHANNEL_RECEIVED:
      return {
        ...state,
        loading: false,
        channels: action.payload
      }
    default:
      return state;
  }
};

export default channelReducer;

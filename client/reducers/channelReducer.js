import * as types from "../constants/channelTypes";

const initalState = {
  channels: [],
  loading: false,
  error: false
};

const channelReducer = (state = initalState, action) => {
  switch (action.type) {
    case types.ADD_CHANNEL_BEGIN:
      return {
        ...state,
        loading: true,
        error: false
      };
    case types.ADD_CHANNEL_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        channels: [...state.channels, action.payload]
      };
    case types.ADD_CHANNEL_FAILURE:
      return {
        ...state,
        loading: false,
        error: true
      };
    default:
      return state;
  }
};

export default channelReducer;

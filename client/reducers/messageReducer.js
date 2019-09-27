import {
  MESSAGES_FAILURE,
  MESSAGES_RECEIVED,
  MESSAGES_REQUEST,
  ADD_MESSAGE_RECEIVED
} from "../constants/messageTypes";

const initialState = {
  isLoading: false,
  messages: [],
  error: null
};

const messageReducer = (state = initialState, action) => {
  switch (action.type) {
    case MESSAGES_REQUEST:
      return {
        ...state,
        isLoading: true
      };
    case MESSAGES_RECEIVED:
      return {
        ...state,
        isLoading: false,
        messages: action.payload
      };
    case MESSAGES_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: true
      };
    case ADD_MESSAGE_RECEIVED:
      return {
        ...state,
        loading: false,
        messages: [...state.messages, action.payload]
      };
    default:
      return state;
  }
};

export default messageReducer;

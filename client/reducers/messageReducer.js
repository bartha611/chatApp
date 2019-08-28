import {
  FETCH_MESSAGES_BEGIN,
  FETCH_MESSAGES_END,
  FETCH_MESSAGES_FAILURE,
  ADD_MESSAGE
} from "../constants/messageTypes";

const initialState = {
  isLoading: false,
  messages: [],
  error: null
};

const messageReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_MESSAGES_BEGIN:
      return {
        ...state,
        isLoading: true
      };
    case FETCH_MESSAGES_END:
      return {
        ...state,
        isLoading: false,
        messages: action.payload
      };
    case FETCH_MESSAGES_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: true
      };
    case ADD_MESSAGE:
      return {
        ...state,
        messages: [...state.messages, action.payload]
      };
    default:
      return state;
  }
};

export default messageReducer;

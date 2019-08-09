import {
  FETCH_USER_BEGIN,
  FETCH_USER_FAILURE,
  FETCH_USER_SUCCESS
} from "../constants/userTypes";

const currentState = {
  isLoading: false,
  user: "",
  error: null
};
const userReducer = (state = currentState, action) => {
  switch (action.type) {
    case FETCH_USER_BEGIN:
      return {
        ...state,
        isLoading: true
      };
    case FETCH_USER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        user: action.payload
      };
    case FETCH_USER_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.error
      };
    default:
      return state;
  }
};

export default userReducer;

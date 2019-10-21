import {
  USER_REQUEST,
  LOGIN_RECEIVED,
  LOGOUT_RECEIVED,
  USER_FAILURE
} from "../actions/userAction";

const currentState = {
  userLoading: false,
  username: "",
  authenticated: false,
  userError: null
};
const userReducer = (state = currentState, action) => {
  switch (action.type) {
    case USER_REQUEST:
      return {
        ...state,
        userLoading: true
      };
    case LOGIN_RECEIVED:
      return {
        ...state,
        userLoading: false,
        username: action.username,
        authenticated: true,
        userError: null
      };
    case LOGOUT_RECEIVED:
      return {
        ...state,
        userLoading: false,
        username: "",
        authenticated: false,
        userError: false
      };
    case USER_FAILURE:
      return {
        ...state,
        userLoading: false,
        userError: true
      };
    default:
      return state;
  }
};

export default userReducer;

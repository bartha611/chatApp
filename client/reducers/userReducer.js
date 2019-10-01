import * as types from "../constants/userTypes";

const currentState = {
  userLoading: false,
  username: "",
  authenticated: false,
  team: [],
  userError: null
};
const userReducer = (state = currentState, action) => {
  switch (action.type) {
    case types.USER_REQUEST:
      return {
        ...state,
        userLoading: true
      };
    case types.LOGIN_USER_RECEIVED:
      console.log(action.payload);
      return {
        ...state,
        userLoading: false,
        username: action.payload,
        authenticated: true,
        userError: null
      };
    case types.LOGOUT_USER_RECEIVED:
      return {
        ...state,
        userLoading: false,
        username: "",
        authenticated: false,
        userError: false
      };
    case types.CREATE_USER_RECEIVED:
      return {
        ...state,
        userLoading: false,
        username: action.payload.username,
        userError: false
      };
    case types.USER_FAILURE:
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

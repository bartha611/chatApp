const currentState = {
  userLoading: false,
  username: "",
  authenticated: false,
  userError: null
};
const userReducer = (state = currentState, action) => {
  switch (action.type) {
    case "USER_REQUEST":
      return {
        ...state,
        userLoading: true
      };
    case "USER_LOGIN":
      return {
        ...state,
        userLoading: false,
        username: action.username,
        authenticated: true,
        userError: null
      };
    case "USER_LOGOUT":
      return {
        ...state,
        userLoading: false,
        username: "",
        authenticated: false,
        userError: false
      };
    case "USER_FAILURE":
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

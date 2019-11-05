const currentState = {
  loading: false,
  username: "",
  authenticated: false,
  error: null
};
const userReducer = (state = currentState, action) => {
  switch (action.type) {
    case "USER_REQUEST":
      return {
        ...state,
        loading: true
      };
    case "USER_LOGIN":
      return {
        ...state,
        loading: false,
        username: action.payload,
        authenticated: true,
        error: null
      };
    case "USER_LOGOUT":
      return {
        ...state,
        loading: false,
        username: "",
        authenticated: false,
        error: false
      };
    case "USER_FAILURE":
      return {
        ...state,
        loading: false,
        error: true
      };
    default:
      return state;
  }
};

export default userReducer;

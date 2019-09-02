import * as types from '../constants/userTypes';

const currentState = {
  isLoading: false,
  authenticated: false,
  team: [],
  error: null
};
const userReducer = (state = currentState, action) => {
  switch (action.type) {
    case types.FETCH_USER_BEGIN:
      return {
        ...state,
        isLoading: true
      };
    case types.FETCH_USER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        authenticated: true
      };
    case types.LOGOUT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        authenticated: false
      }
    case types.FETCH_USER_FAILURE:
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

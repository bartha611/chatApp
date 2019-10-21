export const LOGIN_RECEIVED = "LOGIN_REQUEST";
export const LOGOUT_RECEIVED = "LOGOUT_REQUEST";
export const USER_REQUEST = "USER_REQUEST";
export const USER_FAILURE = "USER_FAILURE";

export const userRequest = (url, payload) => {
  return {
    type: USER_REQUEST,
    url,
    payload
  };
};

export const loginUser = username => {
  return {
    type: LOGIN_RECEIVED,
    username
  };
};

export const logoutUser = () => {
  return {
    type: LOGOUT_RECEIVED
  };
};

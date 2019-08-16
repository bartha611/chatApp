import axios from "axios";
import * as types from '../constants/userTypes';

export function fetchUser(username, password) {
  return async dispatch => {
    dispatch({ type: types.FETCH_USER_BEGIN });
    try {
      const response = await axios.post(`http://localhost:3000/user/login`, {
        username,
        password
      });
      dispatch({ type: types.FETCH_USER_SUCCESS, payload: response.data });
    } catch (err) {
      dispatch({ type: types.FETCH_USER_FAILURE, error: err });
    }
  };
}
export function logoutUser() {
  return async dispatch => {
    dispatch({ type: types.FETCH_USER_BEGIN });
    try {
      const response = await axios.post('http://localhost:3000/user/logout');
      if(response) {
        dispatch({type: types.LOGOUT_SUCCESS })
      } else {
        dispatch({type: types.LOGOUT_FAILURE})
      }
    } catch(err) {
      dispatch({ type: types.FETCH_USER_FAILURE})
    }
  }
}

export function signupUser(username,email,password) {
  return async dispatch => {
    dispatch({ type: types.FETCH_USER_BEGIN });
    try {
      const response= await axios.post('http://localhost:3000/user/register', {
        username,
        email,
        password
      });
      dispatch({type: types.FETCH_USER_SUCCESS, payload: response.data})
    } catch(err) {
      dispatch({type: types.FETCH_USER_FAILURE})
    }
  }
}

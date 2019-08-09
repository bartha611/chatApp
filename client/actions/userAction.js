import axios from "axios";
import {
  FETCH_USER_BEGIN,
  FETCH_USER_FAILURE,
  FETCH_USER_SUCCESS
} from "../constants/userTypes";

export function fetchUser(username, password, method) {
  return async dispatch => {
    dispatch({ type: FETCH_USER_BEGIN });
    try {
      const response = await axios.post(`http://localhost:3000/user/${method}`, {
        username,
        password
      });
      dispatch({ type: FETCH_USER_SUCCESS, payload: response.data });
    } catch (err) {
      dispatch({ type: FETCH_USER_FAILURE, error: err.error.response.data });
    }
  };
}

export function signupUser(username,email,password) {
  return async dispatch => {
    dispatch({ type: FETCH_USER_BEGIN });
    try {
      const response= await axios.post('http://localhost:3000/user/register', {
        username,
        email,
        password
      });
      dispatch({type: FETCH_USER_SUCCESS, payload: response.data})
    } catch(err) {
      dispatch({type: FETCH_USER_FAILURE})
    }
  }
  
}

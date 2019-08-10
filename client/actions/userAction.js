import axios from "axios";
import {
  FETCH_USER_BEGIN,
  FETCH_USER_FAILURE,
  FETCH_USER_SUCCESS
} from "../constants/userTypes";

export function fetchUser(username, password) {
  return async dispatch => {
    dispatch({ type: FETCH_USER_BEGIN });
    try {
      const response = await axios.post(`http://localhost:3000/user/login`, {
        username,
        password
      });
      dispatch({ type: FETCH_USER_SUCCESS, payload: response.data });
    } catch (err) {
      dispatch({ type: FETCH_USER_FAILURE, error: err });
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

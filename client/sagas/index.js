import { put, call, fork } from "redux-saga/effects";
import axios from "axios";

const fetchData = (method, data, url) => {
  return axios({
    method,
    url,
    data
  })
    .then(response => {
      return response;
    })
    .catch(error => {
      return error;
    });
};

export function* loginUser(action) {
  try {
    const { data } = yield call(
      fetchData,
      "POST",
      action.payload,
      action.endpoint
    );
    console.log(data);
  } catch (error) {
    yield put({ type: "LOGIN_FAILURE" });
  }
}

export default function* rootsaga() {
  yield [fork(loginUser)];
}

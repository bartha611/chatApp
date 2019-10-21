import { call, put, takeLatest } from "redux-saga/effects";

import {
  USER_REQUEST,
  loginUser,
  logoutUser,
  LOGIN_RECEIVED,
  USER_FAILURE
} from "../actions/userAction";

import { TEAM_FAILURE, fetchTeams, TEAM_REQUEST } from "../actions/teamAction";

import fetchData from "./api";

function* loginFlow(action) {
  const { url, payload } = action;
  try {
    const { data } = yield call(fetchData, "POST", `/user/${url}`, payload);
    if (url === "logout") {
      yield put(logoutUser());
    } else {
      yield put(loginUser(data));
    }
  } catch (err) {
    yield put({ type: USER_FAILURE });
  }
}

function* getTeams(action) {
  const { username } = action;
  try {
    yield put({ type: TEAM_REQUEST });
    const { data } = yield call(
      fetchData,
      "GET",
      `/channel/read?username=${username}`
    );
    yield put(fetchTeams(data));
  } catch (error) {
    yield put({ type: TEAM_FAILURE });
  }
}

export default function* watchLogin() {
  yield takeLatest(USER_REQUEST, loginFlow);
  yield takeLatest(LOGIN_RECEIVED, getTeams);
}

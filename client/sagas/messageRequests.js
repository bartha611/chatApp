import { put, takeEvery, call } from "redux-saga/effects";
import fetchData from "./api";

import {} from "../actions/messageAction";

function* messageRequest(action) {
  try {
  } catch (error) {
    yield put();
  }
}

export default function* watchMessage() {
  yield takeEvery();
}

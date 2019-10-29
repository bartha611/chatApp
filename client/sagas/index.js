import { put, call, fork, take, all, select } from "redux-saga/effects";
import * as actions from "../actions";

import history from "../history";

import { userApi, teamApi, messageApi, channelApi } from "./api";

function* fetchEntity(entity, api, operation, payload, navigate = null) {
  yield put(entity.request());
  try {
    const { data } = yield call(api, operation, payload);
    yield put(entity.success(operation, data));
    if (navigate) {
      yield call(history.push, navigate);
    }
  } catch (error) {
    yield put(entity.failure());
  }
}

const fetchUser = fetchEntity.bind(null, actions.user, userApi);
const fetchMessage = fetchEntity.bind(null, actions.message, messageApi);
const fetchTeam = fetchEntity.bind(null, actions.team, teamApi);
const fetchChannel = fetchEntity.bind(null, actions.channel, channelApi);

function* watchChannel() {
  while (true) {
    const { operation, data, navigation } = yield take(actions.LOAD_CHANNEL);
    yield call(fetchChannel, operation, data, navigation);
  }
}

const getUser = state => state.user;
function* watchUser() {
  while (true) {
    const { operation, data } = yield take(actions.LOAD_USER);
    yield call(fetchUser, operation, data);
    const user = select(getUser);
    if (operation === "LOGIN" && user.error === null) {
      const { username } = data;
      yield call(fetchTeam, "READ", username);
    }
  }
}

function* watchTeam() {
  while (true) {
    const { operation, data } = yield take(actions.LOAD_TEAM);
    yield call(fetchTeam, operation, data);
  }
}

function* watchMessage() {
  while (true) {
    const { operation, data } = yield take(actions.LOAD_MESSAGE);
    yield call(fetchMessage, operation, data);
  }
}

export default function* rootsaga() {
  yield all([
    fork(watchChannel),
    fork(watchUser),
    fork(watchMessage),
    fork(watchTeam)
  ]);
}

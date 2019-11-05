import { put, call, fork, take, all, select } from "redux-saga/effects";
import * as actions from "../actions";

import { userApi, teamApi, messageApi, channelApi } from "./api";

function* fetchEntity(
  entity,
  api,
  operation,
  payload,
  navigate = null,
  history = null
) {
  yield put(entity.request());
  try {
    const { data } = yield call(api, operation, payload);
    yield put(entity.success(operation, data));
    if (navigate && typeof navigate === "function") {
      history.push(navigate(data));
    } else if (navigate) {
      history.push(navigate);
    }
  } catch (error) {
    console.log(error);
    yield put(entity.failure());
  }
}

const fetchUser = fetchEntity.bind(null, actions.user, userApi);
const fetchMessage = fetchEntity.bind(null, actions.message, messageApi);
const fetchTeam = fetchEntity.bind(null, actions.team, teamApi);
const fetchChannel = fetchEntity.bind(null, actions.channel, channelApi);

function* watchChannel() {
  while (true) {
    const { operation, data, navigation, history } = yield take(
      actions.LOAD_CHANNEL
    );
    yield call(fetchChannel, operation, data, navigation, history);
  }
}

const getUser = state => state.user;
function* watchUser() {
  while (true) {
    const { operation, data, history } = yield take(actions.LOAD_USER);
    yield call(fetchUser, operation, data);
    const user = yield select(getUser);
    if (operation === "LOGIN" && user.error === null) {
      const { username } = data;
      const navigate = teams => `/${teams[0].shortid}`;
      yield call(fetchTeam, "READ", { username }, navigate, history);
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
    const state = yield select();
    console.log(state);
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

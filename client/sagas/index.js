import moment from "moment-timezone";
import { put, call, fork, take, all, select } from "redux-saga/effects";
import * as actions from "../actions";

import { userApi, teamApi, messageApi, channelApi, memberApi } from "./api";

function* fetchEntity(
  entity,
  api,
  operation,
  payload,
  navigate = null,
  history = null,
  redirect = null
) {
  yield put(entity.request());
  const { data, error } = yield call(api, operation, payload);
  if (data) {
    yield put(entity.success(operation, data));
    if (navigate && typeof navigate === "function") {
      history.push(navigate(data));
    } else if (navigate) {
      history.push(navigate);
    }
  } else {
    if (redirect) {
      history.push(redirect);
    }
    entity.failure(error);
  }
}

const fetchUser = fetchEntity.bind(null, actions.user, userApi);
const fetchMessage = fetchEntity.bind(null, actions.message, messageApi);
const fetchTeam = fetchEntity.bind(null, actions.team, teamApi);
const fetchChannel = fetchEntity.bind(null, actions.channel, channelApi);
const fetchMember = fetchEntity.bind(null, actions.member, memberApi);

function* watchChannel() {
  while (true) {
    const { operation, data, navigation, history } = yield take(
      actions.LOAD_CHANNEL
    );
    yield call(fetchChannel, operation, data, navigation, history);
  }
}

function* watchUser() {
  while (true) {
    const { operation, data, navigation, history } = yield take(
      actions.LOAD_USER
    );
    yield call(fetchUser, operation, data, navigation, history);
    const user = yield select(state => state.user);
    if (operation === "LOGIN" && user.error === null) {
      const { username } = user;
      const navigate = teams => `/${teams[0].shortid}`;
      yield call(fetchTeam, "READ", { username }, navigate, history);
    }
  }
}

function* watchTeam() {
  while (true) {
    const { operation, data, navigation, history } = yield take(
      actions.LOAD_TEAM
    );
    yield call(fetchTeam, operation, data, navigation, history);
  }
}

function* watchMessage() {
  while (true) {
    const { operation, data, navigation, history } = yield take(
      actions.LOAD_MESSAGE
    );
    yield call(fetchMessage, operation, data, navigation, history);
  }
}

function* watchMembers() {
  while (true) {
    const { operation, data } = yield take(actions.LOAD_MEMBER);
    yield call(fetchMember, operation, data);
  }
}

// for loading contents of dashboard
function* watchLoad() {
  while (true) {
    const { data, history } = yield take(actions.LOAD_INFO);
    yield call(fetchChannel, "READ", data, null, history, "/");
    yield call(fetchMember, "READ", data, null, history, "/");
    const { channel } = data;
    yield call(
      fetchMessage,
      "READ",
      { channel, zone: moment.tz.guess() },
      null,
      history
    );
  }
}

export default function* rootsaga() {
  yield all([
    fork(watchChannel),
    fork(watchUser),
    fork(watchMessage),
    fork(watchTeam),
    fork(watchMembers),
    fork(watchLoad)
  ]);
}

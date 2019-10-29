const REQUEST = "REQUEST";
const CREATE = "CREATE";
const READ = "READ";
const UPDATE = "UPDATE";
const DELETE = "DELETE";
const FAILURE = "FAILURE";
const LOGIN = "LOGIN";
const LOGOUT = "LOGOUT";

// loader constants for redux-saga to watch for
export const LOAD_USER = "LOAD_USER";
export const LOAD_MESSAGE = "LOAD_MESSAGE";
export const LOAD_CHANNEL = "LOAD_CHANNEL";
export const LOAD_TEAM = "LOAD_TEAM";

// create constants for action events
const createConstants = base => {
  const constants =
    base === "USER"
      ? [REQUEST, LOGIN, LOGOUT, FAILURE]
      : [REQUEST, CREATE, READ, UPDATE, DELETE, FAILURE];
  return constants.reduce((acc, cur) => {
    acc[cur] = `${base}_${cur}`;
    return acc;
  }, {});
};

export const USER = createConstants("USER");
export const MESSAGE = createConstants("MESSAGE");
export const TEAM = createConstants("TEAM");
export const CHANNEL = createConstants("CHANNEL");

const action = (type, payload = {}) => {
  return { type, ...payload };
};

// create actions for dispatching in redux-saga
const createAction = constant => {
  return {
    request: () => action(constant[REQUEST]),
    success: (operation, payload) => action(constant[operation], payload),
    failure: () => action(constant[FAILURE])
  };
};

export const user = createAction(USER);
export const message = createAction(MESSAGE);
export const channel = createAction(CHANNEL);
export const team = createAction(TEAM);

// create loader actions for redux saga to watch for
const loader = (domain, operation, data) => {
  return action(`LOAD_${domain}`, { operation, data });
};

export const userLoader = loader.bind(null, "USER");
export const messageLoader = loader.bind(null, "MESSAGE");
export const channelLoader = loader.bind(null, "CHANNEL");
export const teamLoader = loader.bind(null, "TEAM");

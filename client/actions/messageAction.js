import moment from "moment-timezone";

export const MESSAGE_REQUEST = "MESSAGE_REQUEST";
export const FETCH_MESSAGES_RECEIVED = "FETCH_MESSAGES_RECEIVED";
export const ADD_MESSAGE_RECEIVED = "ADD_MESSAGE_RECEIVED";
export const MESSAGE_FAILURE = "MESSAGE_FAILURE";

export const sendMessage = (message, shortid, username) => {
  const zone = moment.tz.guess();
  return {
    type: ""
  }
}


export function fetchMessages(shortId) {
  const zone = moment.tz.guess();
  return {
    type: "MESSAGES",
    verb: "GET",
    endpoint: `/message/read?shortid=${shortId}&zone=${zone}`
  };
}
export const sendMessage = (message, shortid, username) => {
  const zone = moment.tz.guess();
  return {
    verb: "POST",
    type: "MESSAGES",
    endpoint: "/message/create",
    payload: { message, shortid, username, zone },
    event: "input",
    operation: "ADD"
  };
};

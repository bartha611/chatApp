import moment from "moment-timezone";

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

export function fetchMessages(shortId) {
  return {
    type: "MESSAGES",
    verb: "GET",
    endpoint: `/message/read?shortid=${shortId}`
  };
}
export const sendMessage = (message, shortid, username) => {
  const Time = new Date();
  const date = Time.toUTCString();
  return {
    verb: "POST",
    type: "MESSAGES",
    endpoint: "/message/create",
    payload: { message, shortid, username, date },
    event: "input",
    operation: "ADD"
  };
};

export function fetchMessages(shortId) {
  return {
    type: "MESSAGES",
    verb: "GET",
    endpoint: `/message/read?shortid=${shortId}`
  };
}
export const sendMessage = (message, shortid, username) => {
  const Time = new Date();
  const createdat = Time.toUTCString();
  return {
    verb: "POST",
    type: "MESSAGES",
    endpoint: "/message/create",
    payload: { message, shortid, username, createdat },
    event: "input",
    operation: "ADD"
  };
};

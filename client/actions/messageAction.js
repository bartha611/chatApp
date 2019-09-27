import * as types from "../constants/messageTypes";

import httpAction from './httpAction';

export function fetchMessages(shortId) {
  return httpAction({
    endpoint: `/message/read?shortid=${shortId}`,
    type: 'MESSAGES'
  })
}
export const sendMessage = (message, shortid) => {
  return httpAction({
    verb: 'POST',
    type: 'MESSAGES',
    endpoint: '/message/create',
    payload: {message, shortid},
    operation: 'ADD'
  })
};

export const addMessage = message => {
  return({
    type: types.ADD_MESSAGE,
    payload: message
  })
}

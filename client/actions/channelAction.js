export const addChannel = (name, team, description) => {
  return {
    type: 'CHANNEL',
    verb: 'POST',
    payload: {name, team, description},
    endpoint: '/channel/create',
    operation: 'ADD'
  }
};

export const fetchChannels = team => {
  return {
    type: 'CHANNEL',
    verb: 'GET',
    endpoint: `/channel/read?team=${team}`
  }
};

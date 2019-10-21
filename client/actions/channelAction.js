export const CHANNEL_REQUEST = "CHANNEL_REQUEST";
export const FETCH_CHANNEL_RECEIVED = "FETCH_CHANNEL_RECEIVED";
export const CHANNEL_FAILURE = "CHANNEL_FAILURE";

export const fetchChannels = channels => {
  return {
    type: FETCH_CHANNEL_RECEIVED,
    channels
  };
};

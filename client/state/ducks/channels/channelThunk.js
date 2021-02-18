import * as actions from "./channelSlice";
import api from "../../utils/api";

const populateData = (results) => ({
  READ: actions.readChannel(results),
  CREATE: actions.createChannel(results),
  UPDATE: actions.updateChannel(results),
  DELETE: actions.deleteChannel(results),
});

const fetchChannels = (url, method, operation, data = null, history) => async (
  dispatch
) => {
  dispatch(actions.loadChannel());
  try {
    const response = await api({
      url,
      method,
      data,
    });
    dispatch(populateData(response.data)[operation]);
    if (operation === "READ") {
      history.push(
        `${response.data.team.shortid}/${response.data.channels[0].shortid}`
      );
    } else if (operation === "CREATE") {
      history.push(`/${data.teamId}/${response.data.channel.shortid}`);
    }
  } catch (err) {
    dispatch(actions.errorChannel());
  }
};

export default fetchChannels;

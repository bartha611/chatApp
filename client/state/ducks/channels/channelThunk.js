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
    console.log("aljslkfajskfd");
    const response = await api({
      url,
      method,
      data,
    });
    console.log(response);
    dispatch(populateData(response.data)[operation]);
    if (operation === "READ") {
      console.log("hello there ");
      history.push(
        `${response.data.team.shortid}/${response.data.channels[0].shortid}`
      );
    }
  } catch (err) {
    console.log(err);
    dispatch(actions.errorChannel());
  }
};

export default fetchChannels;

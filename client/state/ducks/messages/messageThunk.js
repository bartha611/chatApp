import * as actions from "./messageSlice";
import api from "../../utils/api";

const populateDate = (results) => ({
  READ: actions.readMessage(results),
  PAGINATE: actions.paginateMessage(results),
  CREATE: actions.createMessage(results),
  UPDATE: actions.updateMessage(results),
  DELETE: actions.deleteMessage(results),
});

const fetchMessages = (url, method, operation, data = null) => async (
  dispatch
) => {
  dispatch(actions.loadMessage());
  try {
    const response = await api({
      url,
      method,
      data,
    });
    dispatch(populateDate(response.data)[operation]);
  } catch (err) {
    console.log(err.response);
    dispatch(actions.errorMessage());
  }
};

export default fetchMessages;

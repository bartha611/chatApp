import * as actions from "./memberSlice";
import api from "../../utils/api";

const populateData = (results) => ({
  READ: actions.readMember(results),
  CREATE: actions.createMember(results),
  UPDATE: actions.updateMember(results),
  DELETE: actions.deleteMember(results),
});

const fetchMembers = (url, method, operation, data = null) => async (
  dispatch
) => {
  dispatch(actions.loadMember());
  try {
    const response = await api({
      url,
      method,
      data,
    });
    dispatch(populateData(response.data)[operation]);
  } catch (err) {
    dispatch(actions.errorMember());
  }
};

export default fetchMembers;

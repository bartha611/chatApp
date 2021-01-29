import * as actions from "./teamSlice";
import api from "../../utils/api";

const populateData = (results) => ({
  READ: actions.readTeam(results),
  CREATE: actions.createTeam(results),
  UPDATE: actions.updateTeam(results),
  DELETE: actions.deleteTeam(results),
});

const fetchTeams = (url, method, operation, data = null, history) => async (
  dispatch
) => {
  dispatch(actions.loadTeam());
  try {
    const response = await api({ url, method, data });
    console.log(response);
    dispatch(populateData(response.data)[operation]);
    if (operation === "CREATE") {
      history.push(`/${response.data.team.shortid}`);
    }
  } catch (err) {
    console.log(err);
    dispatch(actions.errorTeam());
  }
};

export default fetchTeams;

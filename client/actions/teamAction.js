import axios from "axios";
import * as types from "../constants/teamConstants";

export const teamAction = (team, open) => {
  return {
    verb: 'POST',
    type: 'TEAM',
    operation: 'ADD',
    
  }
};
export const fetchTeams = () => {
  return async dispatch => {
    try {
      const response = await axios.get("http://localhost:3000/team/read");
      dispatch({ type: types.FETCH_TEAMS, payload: response.data });
    } catch (err) {
      dispatch({ type: types.ADD_TEAM_FAILURE });
    }
  };
};

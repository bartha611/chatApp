import Axios from 'axios';
import * as types from '../constants/teamConstants';

const teamAction = (team, open) => {
  return async dispatch => {
    dispatch({type: types.ADD_TEAM_BEGIN });
    try {
      const response = Axios.post('http://localhost:3000/team/create', {
        team, 
        open
      })
      dispatch({ type: types.ADD_TEAM_SUCCESS, payload: response.data });
    } catch(err) {
      dispatch({type: types.ADD_TEAM_FAILURE });
    }
  }
}
export default teamAction;
import * as types from '../constants/teamConstants';

const initialState = {
  isLoading: false,
  team: '',
  error: null
}

const teamReducer = (state = initialState, action) => {
  switch(action.type) {
    case types.ADD_TEAM_BEGIN:
      return {
        ...state,
        isLoading: true
      }
    case types.ADD_TEAM_SUCCESS:
      return {
        ...state,
        isLoading: false,
        team: action.payload
      }
    case types.ADD_TEAM_FAILURE:
      return {
        ...state,
        error: action.error
      }
    default:
      return state
  }
}
export default teamReducer
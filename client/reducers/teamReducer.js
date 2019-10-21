import * as types from "../constants/teamConstants";

const initialState = {
  isLoading: false,
  team: null,
  error: null
};

const teamReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.TEAM_REQUEST:
      return {
        ...state,
        isLoading: true
      };
    case types.ADD_TEAM_RECEIVED:
      return {
        ...state,
        isLoading: false,
        team: [...state.team, action.payload]
      };
    case types.TEAM_FAILURE:
      return {
        ...state,
        error: action.error
      };
    case types.TEAM_RECEIVED:
      return {
        ...state,
        team: action.payload
      };
    default:
      return state;
  }
};
export default teamReducer;

export const TEAM_REQUEST = "TEAM_REQUEST";
export const FETCH_TEAM_RECEIVED = "FETCH_TEAM_RECEIVED";
export const CREATE_TEAM_RECEIVED = "CREATE_TEAM_RECEIVED";
export const TEAM_FAILURE = "TEAM_FAILURE";

export const teamRequest = url => {
  return {
    type: TEAM_REQUEST,
    url
  };
};

export const fetchTeams = teams => {
  return {
    type: FETCH_TEAM_RECEIVED,
    teams
  };
};

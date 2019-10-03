export const teamAction = (team, open, username) => {
  return {
    verb: 'POST',
    state: 'TEAM',
    endpoint: '/team/create',
    operation: 'ADD',
    payload: { team, open, username }
  }
};
export const fetchTeams = (username) => {
  return {
    state: 'TEAM',
    verb: 'GET',
    endpoint: `/team/read?username=${username}`,
  }
};

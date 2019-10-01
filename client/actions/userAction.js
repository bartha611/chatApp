export function fetchUser(username, password) {
  return {
    type: "USER",
    verb: "POST",
    endpoint: "/user/login",
    payload: { username, password },
    operation: "LOGIN"
  };
}
export function logoutUser() {
  return {
    type: "USER",
    verb: "POST",
    endpoint: "/user/logout",
    operation: "LOGOUT"
  };
}

export function signupUser(username, email, password) {
  return {
    type: "USER",
    verb: "POST",
    payload: { username, email, password },
    endpoint: "/user/register",
    operation: "CREATE"
  };
}

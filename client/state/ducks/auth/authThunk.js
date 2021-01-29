import * as actions from "./authSlice";

import api from "../../utils/api";

const fetchAuth = (url, method, operation, data = null, history) => async (
  dispatch
) => {
  dispatch(actions.loadAuth());
  try {
    if (operation === "LOGIN") {
      const response = await api({ url, method, data });
      dispatch(actions.loginAuth(response.data));
      localStorage.setItem("token", response.data.token);
      history.push("/");
    } else {
      localStorage.removeItem("token");
      dispatch(actions.logoutAuth());
      history.push("/");
    }
  } catch (err) {
    dispatch(actions.errorAuth());
  }
};

export default fetchAuth;

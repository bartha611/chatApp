import React from "react";
import { Route, Redirect } from "react-router-dom";
import PropTypes from "prop-types";

const isAuthenticated = () => {
  const token = localStorage.getItem("token");
  if (!token) {
    return false;
  }
  const { exp } = JSON.parse(atob(token.split(".")[1]));
  return exp > new Date().getTime() / 1000;
};

const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated() ? (
          <Component {...rest} {...props} />
        ) : (
          <Redirect to={{ pathname: "/login" }} />
        )
      }
    />
  );
};

PrivateRoute.propTypes = {
  component: PropTypes.element.isRequired,
};

export default PrivateRoute;

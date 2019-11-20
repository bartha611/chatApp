import React from "react";
import { useSelector } from "react-redux";
import { Route, Redirect } from "react-router-dom";
import PropTypes from "prop-types";

export default function PrivateRoute({ component: Component, ...rest }) {
  const user = useSelector(state => state.user);
  return (
    <Route
      {...rest}
      render={(props) =>
        user.authenticated ? (
          <Component {...props} />
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
}

PrivateRoute.propTypes = {
  component: PropTypes.element.isRequired
};

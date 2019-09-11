import React from 'react';
import {useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types'

export default function PrivateUserRoute({ component:Component, ...rest }) {
  const user = useSelector(state => state.user);
  return (
    <Route
      {...rest}
      render={(props) => 
        user.authenticated ===true ? (<Component {...props} />) : (<Redirect to='/login' />)
      }
    />
  )
}

PrivateUserRoute.propTypes = {
  component: PropTypes.element.isRequired
}

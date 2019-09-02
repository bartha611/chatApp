import React from 'react';
import {useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

export function PrivateUserRoute({ component:Component, ...rest }) {
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

export function PrivateTeamRoute({component: Component, ...rest }) {
  const user = useSelector(state => state.user);

}
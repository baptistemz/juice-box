import React from 'react';
import { Route, Redirect } from 'react-router';

const PrivateRoute = ({ component: Component, isAuthenticated, registerMethod, ...rest }) => (
  <Route {...rest} render={props => (
    isAuthenticated ? (
      <Component {...props}/>
    ) : (
      <Redirect to={{
        pathname: `/${registerMethod}`,
        state: { from: "/" , redirected: true },
      }}/>
    )
  )}/>
)

export default PrivateRoute;

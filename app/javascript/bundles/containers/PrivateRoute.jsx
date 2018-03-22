import React from 'react';
import { Route, Redirect } from 'react-router';

const PrivateRoute = ({ isAuthenticated, registerMethod, ...rest }) => {
  if(!isAuthenticated){
    <Redirect to={{
      pathname: `/${registerMethod}`,
      state: { from: "/" , redirected: true },
    }}/>
  }
  return(
    <Route {...rest}/>
  )
}

export default PrivateRoute;

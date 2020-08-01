import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import {UserState} from '../context/user';

export default function PrivateRoute({children, ...rest}) {
 console.log(rest);
 const {user} = UserState();

 return (
  <Route
   {...rest}
   render={() => {
    return user.token ? children : <Redirect to='/login' />;
   }}
  ></Route>
 );
}

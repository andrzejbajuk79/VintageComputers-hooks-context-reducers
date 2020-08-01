// user context
import React, {
 createContext,
 useContext,
 useState,
 useEffect,
 useReducer,
} from 'react';
import axios from 'axios';
import {featuredProducts, flattenPoducts} from '../utils/helpers';
import url from '../utils/URL';

export const UserContext = createContext();

function getUserFromLocalStorage() {
 return localStorage.getItem('user')
  ? JSON.parse(localStorage.getItem('user'))
  : {username: null, token: null};
}

export function UserProvider({children}) {
 // const [user, setUser] = useState ({username: null, toke: null});
 const [user, setUser] = useState(getUserFromLocalStorage());
 const [alert, setAlert] = useState({show: false, msg: '', type: 'success'});

 const userLogin = (user) => {
  console.log('user', user);
  setUser(user);
  localStorage.setItem('user', JSON.stringify(user));
 };
 const userLogout = () => {
  setUser({username: null, token: null});
  localStorage.removeItem('user');
 };
 const showAlert = ({msg, type = 'success'}) => {
  setAlert({show: true, msg, type});
  // setTimeout(() => {
  //  hideAlert();
  // }, 3000);
 };
 const hideAlert = () => {
  setAlert({...alert, show: false});
 };
 const value = {user, userLogin, userLogout, alert, showAlert, hideAlert};
 return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export const UserState = () => {
 return useContext(UserContext);
};

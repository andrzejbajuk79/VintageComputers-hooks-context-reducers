import React from 'react';
import {Link} from 'react-router-dom';
import {UserState} from '../context/user';
import {CartState} from '../context/cart';

export default function LoginLink() {
 const {user, userLogout} = UserState();
 const {clearCart} = CartState();

 if (user.token) {
  return (
   <>
    <p className='login-btn'>Witaj {user.username}</p>
    <button
     className='login-btn'
     onClick={() => {
      userLogout();
      clearCart();
     }}
    >
     Logout
    </button>
   </>
  );
 }

 return <Link to='/login'>Login</Link>;
}

import React from 'react';
import {Link} from 'react-router-dom';
import logo from '../assets/amiga.png';
import LoginLink from '../components/LoginLink';
import CartLink from '../components/Cart/CartLink';
import {UserState} from '../context/user';

export default function Header() {
 const {user} = UserState();
 return (
  <header className='header'>
   <img src={logo} alt='stare kompy' className='logo' />
   <nav>
    <ul>
     <div>
      <li>
       <Link to='/'>Home</Link>
      </li>
      <li>
       <Link to='/about'>About</Link>
      </li>
      <li>
       <Link to='/products'>Products</Link>
      </li>
      {user.token && (
       <li>
        <Link to='/checkout'>Checkout</Link>
       </li>
      )}
     </div>
     <div>
      <LoginLink />
      <CartLink />
     </div>
    </ul>
   </nav>
  </header>
 );
}

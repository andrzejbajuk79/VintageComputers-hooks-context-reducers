import React from 'react';
import {Link} from 'react-router-dom';
import logo from '../assets/amiga.png';
import CartLink from '../components/Cart/CartLink';
export default function Header() {
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
     </div>
     <div>
      <li>
       <Link to='/login'>Login</Link>
      </li>
      <CartLink />
     </div>
    </ul>
   </nav>
  </header>
 );
}

import React from 'react';
import {Link} from 'react-router-dom';
import {CartState} from '../../context/cart';

export default function CartLink() {
 const {cartItems, total} = CartState();
 return (
  <div className='cart-link-container'>
   <Link to='/cart'>Cart</Link>
   <span className='cart-link-total'>{cartItems}</span>
  </div>
 );
}

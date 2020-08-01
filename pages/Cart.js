import React from 'react';
import EmptyCart from '../components/Cart/EmptyCart';
import CartItem from '../components/Cart/CartItem';
import {Link} from 'react-router-dom';
import {CartState} from '../context/cart';
import {UserState} from '../context/user';

export default function Cart() {
 const {total, cart} = CartState();
 const {user} = UserState();

 if (cart.length === 0) {
  return <EmptyCart />;
 }
 return (
  <section className='cart-items section'>
   <h2>Your cart</h2>
   {cart.map((item) => {
    return <CartItem key={item.id} {...item} />;
   })}
   <h2>total : PLN {total}</h2>
   {user.token ? (
    <Link to='/checkout' className='btn btn-primary btn-block'>
     checkout
    </Link>
   ) : (
    <Link to='/login' className='btn btn-primary btn-block'>
     login
    </Link>
   )}
  </section>
 );
}

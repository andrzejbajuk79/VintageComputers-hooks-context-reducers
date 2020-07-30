import React from 'react';
import {CartState} from '../context/cart';
import EmptyCart from '../components/Cart/EmptyCart';

export default function Cart() {
 let user = false;
 const {total, cart} = CartState();

 if (cart.length === 0) {
  return <EmptyCart />;
 }
 return <h1>hello from cart page</h1>;
}

// cart context
import React, {createContext, useContext, useState, useEffect} from 'react';
import localCart from '../utils/localCart';

const CartContext = createContext();

function CartProvider({children}) {
 const [cart, setCart] = useState(localCart);
 const [total, setTotal] = useState(0);
 const [cartItems, setCartItems] = useState(0);

 useEffect(() => {
  //local storage

  //cart items
  let newCartItems = cart.reduce((total, item) => {
   return (total += item.amount);
  }, 0);
  setCartItems(newCartItems);
  console.log(newCartItems);
  //cart total
  let newTotal = cart.reduce((total, item) => {
   return (total += item.price * item.amount);
  }, 0);
  newTotal = parseFloat(newTotal.toFixed(2));
  setTotal(newTotal);
  console.log(newTotal);
 }, [cart]);

 // remove item from cart
 const removeItem = (id) => {
  setCart([...cart].filter((item) => item.id !== id));
 };
 // azwiakszanie ilosci item
 const increaseAmount = (id) => {
  const newCart = [...cart].map((item) =>
   item.id === id ? {...item, amount: item.amount + 1} : {...item}
  );
  setCart(newCart);
 };
 // zzmniejszanie ilosci item
 const decreaseAmount = (id, amount) => {
  if (amount === 1) {
   removeItem(id);
   return;
  } else {
   const newCart = [...cart].map((item) =>
    item.id === id ? {...item, amount: item.amount - 1} : {...item}
   );

   setCart(newCart);
  }
 };
 // remove item from cart
 const addToCart = (product) => {};
 // clear cart
 const clearCart = () => {};

 const value = {
  cart,
  total,
  cartItems,
  removeItem,
  increaseAmount,
  decreaseAmount,
  addToCart,
  clearCart,
 };
 return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

const CartState = () => {
 return useContext(CartContext);
};

export {CartProvider, CartState};

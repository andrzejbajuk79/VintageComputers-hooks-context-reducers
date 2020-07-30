// cart context
import React, {createContext, useContext, useState, useEffect} from 'react';
import localCart from '../utils/localCart';

const getCartFromLocalStorage = () => {
 return localStorage.getItem('cart')
  ? JSON.parse(localStorage.getItem('cart'))
  : [];
};
const CartContext = createContext();

function CartProvider({children}) {
 const [cart, setCart] = useState(getCartFromLocalStorage());
 const [total, setTotal] = useState(0);
 const [cartItems, setCartItems] = useState(0);

 useEffect(() => {
  //local storage
  localStorage.setItem('cart', JSON.stringify(cart));

  //ilosc przedmiotow w koszyku zakupow
  let newCartItems = cart.reduce((total, item) => {
   return (total += item.amount);
  }, 0);
  setCartItems(newCartItems);

  // calkowita wartosc przedmiotow w koszyku zakupow
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
 // zwiakszanie ilosci przedmiotow w koszyku
 const increaseAmount = (id) => {
  const newCart = [...cart].map((item) =>
   item.id === id ? {...item, amount: item.amount + 1} : {...item}
  );
  setCart(newCart);
 };
 // zzmniejszanie  ilosci przedmiotow w koszyku
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
 //  item from cart
 const addToCart = (product) => {
  const {
   id,
   // image: {url},
   image,
   title,
   price,
  } = product;
  //sprawdzmy czy po kliknieciu dodaj dany produkt
  // jest juz w naszym koszyku zakupow
  const item = [...cart].find((item) => item.id === id);
  if (item) {
   increaseAmount(id);
   return;
  } else {
   // const newItem = {id, image: url, title, price, amount: 1};
   const newItem = {id, image, title, price, amount: 1};
   const newCart = [...cart, newItem];
   setCart(newCart);
  }
  console.log(product);
 };
 // clear cart
 const clearCart = () => {
  setCart([]);
 };

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

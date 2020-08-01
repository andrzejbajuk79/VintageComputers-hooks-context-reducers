// cart context
import React, {
 createContext,
 useReducer,
 useContext,
 useState,
 useEffect,
} from 'react';
import reducer from './/CartReducer';
import * as actions from './CartActions';
import initialState from './initialState';

const getCartFromLocalStorage = () => {
 return localStorage.getItem('cart')
  ? JSON.parse(localStorage.getItem('cart'))
  : [];
};
const CartContext = createContext();

function CartProvider({children}) {
 // const [cart, setCart] = useState(getCartFromLocalStorage());
 getCartFromLocalStorage();
 const [cart, dispatch] = useReducer(reducer, getCartFromLocalStorage());
 const [total, setTotal] = useState(0);
 const [cartItems, setCartItems] = useState(0);
 console.log('initial state', cart);
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
  dispatch({type: actions.REMOVE_CART, payload: {id}});
  // setCart([...cart].filter((item) => item.id !== id));
 };

 // zwiakszanie ilosci przedmiotow w koszyku
 const increaseAmount = (id) => {
  dispatch({type: actions.INCREASE_CART, payload: {id}});
  // const newCart = [...cart].map((item) =>
  //  item.id === id ? {...item, amount: item.amount + 1} : {...item}
  // );
  // setCart(newCart);
 };

 // zzmniejszanie  ilosci przedmiotow w koszyku
 const decreaseAmount = (id, amount) => {
  if (amount === 1) {
   dispatch({type: actions.REMOVE_CART, payload: {id}});
   return;
  } else {
   dispatch({type: actions.DECREASE_CART, payload: {id}});
   // const newCart = [...cart].map((item) =>
   //  item.id === id ? {...item, amount: item.amount - 1} : {...item}
   // );
   // setCart(newCart);
  }
 };
 //  item from cart
 const addToCart = (product) => {
  let item = [...cart].find((item) => item.id == product.id);

  if (item) {
   dispatch({type: actions.INCREASE_CART, payload: product.id});
  } else {
   console.log('test');
   dispatch({type: actions.ADD_TO_CART, payload: product});
  }
  // const {
  //  id,
  //  // image: {url},
  //  image,
  //  title,
  //  price,
  // } = product;
  // //sprawdzmy czy po kliknieciu dodaj dany produkt
  // // jest juz w naszym koszyku zakupow
  // const item = [...cart].find((item) => item.id === id);
  // if (item) {
  //  increaseAmount(id);
  //  return;
  // } else {
  //  // const newItem = {id, image: url, title, price, amount: 1};
  //  const newItem = {id, image, title, price, amount: 1};
  //  const newCart = [...cart, newItem];
  //  setCart(newCart);
  // }
 };

 // clear cart
 const clearCart = () => {
  dispatch({type: actions.CLEAR_CART});
  // setCart([]);
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

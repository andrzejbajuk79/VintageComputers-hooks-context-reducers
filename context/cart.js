// cart context
import React, {createContext, useContext, useState, useEffect} from 'react';
import localCart from '../utils/localCart';

const CartContext = createContext();

function CartProvider({children}) {
 const [cart, setCart] = useState([]);
 const [total, setTotal] = useState(0);
 const [cartItem, setCartItem] = useState(0);

 const value = {cart, total, cartItem};
 return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

const CartState = () => {
 return useContext(CartContext);
};

export {CartProvider, CartState};

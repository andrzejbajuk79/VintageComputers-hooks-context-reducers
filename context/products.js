import React, {
 createContext,
 useContext,
 useState,
 useEffect,
 useReducer,
} from 'react';
import axios from 'axios';
import {featuredProducts, flattenPoducts} from '../utils/helpers';
import url from '../utils/URL';
import {initialState} from './initialState';

const SET_PRODUCTS = 'SET_PRODUCTS';
const SET_FEATURED = 'SET_FEATURED';

const ProductContext = createContext();
const reducer = (state, action) => {
 const {type, payload} = action;
 if (type === SET_PRODUCTS) {
  return [payload, ...state];
 }
 return state;
};

export const ProductProvider = ({children}) => {
 const [loading, setLoading] = useState(false);
 const [products, setProducts] = useState([]);
 const [featured, setFeatured] = useState([]);

 useEffect(() => {
  setLoading(true);
  axios.get(`${url}/products`).then((response) => {
   console.log(response.data);
   // const featured = featuredProducts(response.data);
   const featured = featuredProducts(flattenPoducts(response.data));
   const products = flattenPoducts(response.data);
   //set products
   setProducts(products);
   //set featured
   setFeatured(featured);
   setLoading(false);
  });

  return () => {};
 }, []);

 const fetchProducts = () => {};
 const fetchFeatured = () => {};
 const value = {loading, products, featured};
 return (
  <ProductContext.Provider value={value}>{children}</ProductContext.Provider>
 );
};

export const ProductState = () => {
 return useContext(ProductContext);
};

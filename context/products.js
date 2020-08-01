import React, {
 createContext,
 useContext,
 useState,
 useEffect,
 useReducer,
} from 'react';
import axios from 'axios';
import {featuredProducts, flattenPoducts, paginate} from '../utils/helpers';
import url from '../utils/URL';
import {initialState} from './initialState';

const ProductContext = createContext();

export const ProductProvider = ({children}) => {
 const [loading, setLoading] = useState(false);
 const [products, setProducts] = useState([]);
 const [featured, setFeatured] = useState([]);
 const [sorted, setSorted] = useState([]);
 const [page, setPage] = useState(0);
 const [filters, setFilters] = useState({
  search: '',
  category: 'all',
  shiping: false,
  price: 'all',
 });

 useEffect(() => {
  setLoading(true);
  axios.get(`${url}/products`).then((response) => {
   // const featured = featuredProducts(response.data);
   const featured = featuredProducts(flattenPoducts(response.data));
   const products = flattenPoducts(response.data);

   //sortowanie
   setSorted(paginate(products));
   //set products
   setProducts(products);
   //set featured
   setFeatured(featured);
   setLoading(false);
  });

  return () => {};
 }, []);

 const changePage = (index) => {
  //zmieniamy strone po kliknieciu button PageProduct
  //tej strony uzywamy w  PageProduct - sorted[page] do wyswietlania
  //tabeli ktora zawiera w sobie 4 inne tabele i wskazujemy ktora
  setPage(index);
 };
 const updateFilters = (e) => {
  console.log('filter', e);
 };
 const value = {
  loading,
  products,
  featured,
  sorted,
  page,
  changePage,
  updateFilters,
 };
 return (
  <ProductContext.Provider value={value}>{children}</ProductContext.Provider>
 );
};

export const ProductState = () => {
 return useContext(ProductContext);
};

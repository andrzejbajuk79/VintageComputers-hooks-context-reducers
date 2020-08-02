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
  shipping: false,
  price: 'all',
 });
 //pobranie inicjalnie danych
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

 //filtrowanie
 useEffect(() => {
  //deafultowe sortowanie
  let newProducts = [...products].sort((a, b) => a.price - b.price);
  const {search, category, shipping, price} = filters;
  if (category !== 'all') {
   newProducts = newProducts.filter((item) => item.category === category);
  }
  if (shipping !== false) {
   newProducts = newProducts.filter((item) => item.shipping === shipping);
  }
  if (search !== '') {
   newProducts = newProducts.filter((item) => {
    let title = item.title.toLowerCase().trim();
    return title.startsWith(search) ? item : null;
   });
  }

  if (price !== 'all') {
   newProducts = newProducts.filter((item) => {
    if (price === 0) {
     return item.price < 300;
    } else if (price === 300) {
     return item.price > 300 && item.price < 650;
    } else {
     return item.price > 650;
    }
   });
  }

  setPage(0);
  setSorted(paginate(newProducts));
 }, [filters, products]);

 // paginacja
 const changePage = (index) => {
  //zmieniamy strone po kliknieciu button PageProduct
  //tej strony uzywamy w  PageProduct - sorted[page] do wyswietlania
  //tabeli ktora zawiera w sobie 4 inne tabele i wskazujemy ktora
  setPage(index);
 };

 // filtrowanie
 const updateFilters = (e) => {
  const type = e.target.type;
  const filter = e.target.name;
  const value = e.target.value;
  let filterValue;
  console.log(type, filter, value);
  if (type === 'checkbox') {
   filterValue = e.target.checked;
  } else if (type === 'radio') {
   //jezeli bez widelek to string ALL, jezeli widelki to liczby
   value === 'all' ? (filterValue = value) : (filterValue = parseInt(value));
  } else {
   filterValue = value;
  }

  setFilters({...filters, [filter]: filterValue});
 };

 // state
 const value = {
  loading,
  products,
  featured,
  sorted,
  page,
  filters,
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

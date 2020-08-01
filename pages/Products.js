import React from 'react';
import {ProductState} from '../context/products';
import Loading from '../components/Loading';
import ProductList from '../components/Products/ProductList';
import Filters from '../components/Products/Filters';
import PageProducts from '../components/Products/PageProducts';

export default function Products() {
 const {loading, sorted} = ProductState();

 if (loading) {
  return <Loading />;
 }
 // return <ProductList title='our product' products={sorted} />;
 return (
  <>
   <PageProducts />
   <Filters />
  </>
 );
}

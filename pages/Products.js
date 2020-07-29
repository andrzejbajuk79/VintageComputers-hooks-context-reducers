import React from 'react';
import {ProductState} from '../context/products';
import Loading from '../components/Loading';
import ProductList from '../components/Products/ProductList';

export default function Products() {
 const {loading, products} = ProductState();

 if (loading) {
  return <Loading />;
 }
 return <ProductList title='our product' products={products} />;
}

import React from 'react';
import ProductList from './ProductList';
import {ProductState} from '../../context/products';
import Loading from '../Loading';

export default function FeaturedProducts() {
 const {loading, featured} = ProductState();
 if (loading) {
  return <Loading />;
 }

 return <ProductList title='featured product' products={featured} />;
}

import React from 'react';
import {useParams, useHistory} from 'react-router-dom';
import {ProductState} from '../context/products';
import Loading from '../components/Loading';
import {CartState} from '../context/cart';

export default function ProductDetails() {
 // console.log('paramtery', useParams());
 const {id} = useParams();
 const history = useHistory();
 const {products} = ProductState();
 const {addToCart} = CartState();
 const product = products.find((item) => item.id === parseInt(id));
 if (products.length === 0) {
  return <Loading />;
 } else {
  const {
   // image: {url},
   image,
   title,
   price,
   description,
  } = product;
  return (
   <section className='single-product'>
    <img src={image} alt={title} className='single-product-image' />
    <article>
     <h1>{title}</h1>
     <h2>{price}</h2>
     <p>{description}</p>
     <button
      onClick={() => {
       //add to card
       addToCart(product);
       history.push('/cart');
      }}
      className='btn btn-primary btn-block'
     >
      add to card
     </button>
    </article>
   </section>
  );
 }
}

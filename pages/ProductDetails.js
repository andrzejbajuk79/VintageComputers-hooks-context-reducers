import React from 'react';
import {useParams, useHistory} from 'react-router-dom';
import {ProductState} from '../context/products';
import Loading from '../components/Loading';
// import CardtState from '../context/card'

export default function ProductDetails() {
 console.log('paramtery', useParams());
 const {id} = useParams();

 const history = useHistory();
 const {products} = ProductState();
 const product = products.find((item) => item.id === parseInt(id));
 if (products.length === 0) {
  return <Loading />;
 } else {
  const {
   image: {url},
   title,
   price,
   description,
  } = product;
  return (
   <section className='single-product'>
    <img src={url} alt={title} className='single-product-image' />
    <article>
     <h1>{title}</h1>
     <h2>{price}</h2>
     <p>{description}</p>
     <button
      onClick={() => {
       //add to card
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

import React from 'react';
import {Link} from 'react-router-dom';

export default function Product({image, title, id, price}) {
 const imgUrl = image.url;
 return (
  <article className='product'>
   <div className='img-container'>
    <img src={imgUrl} alt='image' />
    <Link to={`products/${id}`} className='btn btn-primary product-link'>
     {' '}
     details{' '}
    </Link>
   </div>
   <div className='product-footer'>
    <p className='product-title'>{title}</p>
    <p className='product-price'>{price}</p>
   </div>
  </article>
 );
}

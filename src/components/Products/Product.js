import React from 'react';
import PropTypes from 'prop-types';
import img from '../../assets/mainBcg.jpeg';

import {Link} from 'react-router-dom';

function Product({image, title, id, price}) {
 // const imgUrl = image.url;

 return (
  <article className='product'>
   <div className='img-container'>
    <img src={image || img} alt='image' />
    <Link to={`products/${id}`} className='btn btn-primary product-link'>
     {' '}
     details{' '}
    </Link>
   </div>
   <div className='product-footer'>
    <p className='product-title'>{title || 'default title'}</p>
    <p className='product-price'>{price || 0}</p>
   </div>
  </article>
 );
}

Product.propTypes = {
 image: PropTypes.string.isRequired,
 title: PropTypes.string.isRequired,
 id: PropTypes.number.isRequired,
 price: PropTypes.number.isRequired,
};
export default Product;

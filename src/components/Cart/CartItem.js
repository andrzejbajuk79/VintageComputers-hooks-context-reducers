import React from 'react';
import {FaAngleUp, FaAngleDown} from 'react-icons/fa';
import {CartState} from '../../context/cart';

export default function CartItem({id, image, title, price, amount}) {
 const {removeItem, increaseAmount, decreaseAmount} = CartState();

 return (
  <article className='cart-item'>
   <img src={image} alt='title' />
   <div>
    <h4>{title}</h4>
    <h5>{price} PLN</h5>
    <button
     className='cart-btn remove-btn'
     type='button'
     onClick={() => removeItem(id)}
    >
     remove
    </button>
   </div>
   <div>
    <button
     type='button'
     className='cart-btn amount btn'
     onClick={() => increaseAmount(id)}
    >
     <FaAngleUp />
    </button>
    <p className='item-amount'>{amount}</p>
    <button
     type='button'
     className='cart-btn amount btn'
     onClick={() => decreaseAmount(id, amount)}
    >
     <FaAngleDown />
    </button>
   </div>
  </article>
 );
}

import React from 'react';
import loading from '../assets/puff.svg';

export default function Loading() {
 return (
  <div className='loading'>
   <img src={loading} alt='loading gif' />
  </div>
 );
}

import React from 'react';
import {FaAngleDoubleUp} from 'react-icons/fa';
import {UserState} from '../context/user';

const ScrollButton = (props) => {
 const {height} = UserState();
 const scrollBackToTop = () => {
  window.scrollTo({
   top: 0,
   left: 0,
   behavior: 'smooth',
  });
 };
 return (
  <button
   onClick={scrollBackToTop}
   className={
    height > 100
     ? 'scroll-btn show-scroll-btn' //
     : 'scroll-btn'
   }
  >
   <FaAngleDoubleUp></FaAngleDoubleUp>
  </button>
 );
};

export default ScrollButton;

import React from 'react';
import ProductList from './ProductList';
import {ProductState} from '../../context/products';

const PageProducts = (props) => {
 const {sorted, page, changePage} = ProductState();

 if (sorted[page]) {
  return (
   <>
    <ProductList products={sorted[page]} />;
    {sorted.length > 1 && (
     <article className='pagination-buttons'>
      {/* prev button */}
      {
       //genereujemy ilosc buttono na podstawie wielkosci tabeli
       sorted.map((_, index) => {
        return (
         <button
          //dodajemy klase jezeli  index button zgazdza sie ze strona na ktorej jestesmy
          className={`page-btn ${page === index && 'page-btn-current'}`}
          onClick={() => changePage(index)}
          key={index}
         >
          {index + 1}
         </button>
        );
       })
      }
     </article>
    )}
   </>
  );
 } else {
  return <h3 className='search-errors'>Brak wynikow</h3>;
 }
};

export default PageProducts;

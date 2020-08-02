import React from 'react';
import {ProductState} from '../../context/products';

const Filters = (props) => {
 const {
  filters: {search, category, shipping, price},
  updateFilters,
  sorted,
 } = ProductState();

 return (
  <section className='filters-section'>
   <h3 className='section-title'>search products</h3>
   <form className='filters-form'>
    <div>
     {/* search input */}
     <div className='form-group'>
      <label htmlFor='search'>search term</label>
      <input
       className='form-control'
       type='text'
       id='search'
       name='search'
       value={search}
       onChange={updateFilters}
      />
     </div>
     {/* end of search input */}

     {/* select input */}
     <div className='form-group'>
      <label htmlFor='category'>category</label>
      <select
       className='form-control'
       id='category'
       name='category'
       value={category}
       onChange={updateFilters}
      >
       <option value='all'>all</option>
       <option value='phone'>phone</option>
       <option value='computer'>computer</option>
       <option value='radio'>radio</option>
      </select>
     </div>
     {/* end of select input */}

     {/* shipping */}
     <div className='form-group'>
      <input
       type='checkbox'
       id='shipping'
       name='shipping'
       checked={shipping}
       onChange={updateFilters}
      />
      <label htmlFor='shipping'>free shipping</label>
     </div>
     {/* end of shipping */}
    </div>
    <div className='price-group'>
     <h6>Price</h6>
     <label>
      <input
       checked={price === 'all'}
       onChange={updateFilters}
       type='radio'
       name='price'
       value='all'
      />
      all
     </label>
     <label>
      <input
       checked={price === 0}
       onChange={updateFilters}
       type='radio'
       name='price'
       value='0'
      />
      $0 - $300
     </label>
     <label>
      <input
       checked={price === 300}
       onChange={updateFilters}
       type='radio'
       name='price'
       value='300'
      />
      $300 - $600
     </label>
     <label>
      <input
       checked={price === 650}
       onChange={updateFilters}
       type='radio'
       name='price'
       value='650'
      />
      over $650
     </label>
    </div>
   </form>
   <h5>Total products:${sorted.flat().length}</h5>
   {/* //splaszczamy tabele */}
   <h4 />
  </section>
 );
};

export default Filters;

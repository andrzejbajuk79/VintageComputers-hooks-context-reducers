import React from 'react';
import {useParams} from 'react-router-dom';

export default function ProductDetails() {
 console.log('paramtery', useParams());
 const {id} = useParams();

 return <h1>hello from product details page z numerem : {id}</h1>;
}

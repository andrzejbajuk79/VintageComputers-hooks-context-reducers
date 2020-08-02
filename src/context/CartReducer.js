import * as actions from './CartActions';
export default (state, action) => {
 const {type, payload} = action;

 switch (type) {
  case actions.ADD_TO_CART:
   const {id, image, title, price} = payload;
   let product = {id, image, title, price, amount: 1};
   console.log(product);
   return [...state, product];
  case actions.REMOVE_CART:
   return state.filter((item) => item.id !== payload.id);
  case actions.INCREASE_CART:
   return state.map((item) =>
    item.id === payload.id ? {...item, amount: item.amount + 1} : {...item}
   );
  case actions.DECREASE_CART:
   return state.map((item) =>
    item.id === payload.id ? {...item, amount: item.amount - 1} : {...item}
   );
  case actions.CLEAR_CART:
   return [];

  default:
   return state;
 }
};

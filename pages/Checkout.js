import React from 'react';
import {useHistory} from 'react-router-dom';
import {UserState} from '../context/user';
import {CartState} from '../context/cart';
import EmptyCart from '../components/Cart/EmptyCart';
import submitOrder from '../strapi/submitOrder';
//react-stripe-elements
import {
 CardElement,
 StripeProvider,
 Elements,
 injectStripe,
} from 'react-stripe-elements';

function Checkout(props) {
 const {user, showAlert, hideAlert, alert} = UserState();
 const {cart, total, clearCart} = CartState();
 const history = useHistory();

 //state values
 const [name, setName] = React.useState('');
 const [error, setError] = React.useState('');
 const isEmpty = !name || alert.show;

 // submitinng form
 async function handleSubmit(e) {
  let msg = 'realizowanie platnosci, czekaj .';
  setInterval(() => {
   msg += '.';
   // if (error) showAlert({msg: msg});
  }, 400);

  e.preventDefault();
  const response = await props.stripe
   .createToken()
   .catch((err) => console.log(err));
  const {token} = response;
  if (token) {
   //prawidlowa platnosc
   setError('');
   const {id} = token;
   let order = await submitOrder({
    name: name,
    total: total,
    items: cart,
    stripeToken: id,
    userToken: user.token,
   });
   if (order) {
    showAlert({msg: 'zamowienie zrealizowane'});
    clearCart();
    history.push('/');
    return;
   } else {
    showAlert({
     msg: 'blad z przetwarzaniem twojego zamowienia',
     type: 'danger',
    });
   }
  } else {
   //blad podczas platnosci

   setError(response.error.message);
  }
 }

 if (cart.length < 1) return <EmptyCart />;

 return (
  <section className='section form'>
   <h2 className='section-title'>checkout</h2>
   <form className='checkout-form'>
    <h3>
     order total : <span>PLN {total}</span>
    </h3>
    <div className='form-control'>
     <label htmlFor='name'>name</label>
     <input
      type='text'
      value={name}
      id='name'
      onChange={(e) => {
       setName(e.target.value);
      }}
     />

     {/* credit card element */}
     <div className='stripe-input'>
      <label htmlFor='card-element'>Credit or debit card</label>
      <p className='stripe-info'>
       test using this credit card :<span>4242 4242 4242 4242</span>
       <br />
       enter any 5 digits for the zip code
       <br />3 digit for CVC
      </p>
     </div>
    </div>
    {/* stripe elements */}
    <CardElement className='card-element'></CardElement>
    {/* stripe errors */}
    {error && <p className='form-empty'>{error}</p>}
    {/* empty values */}
    {isEmpty ? (
     <p className='form-empty'>uzuplenij brakujace pola</p>
    ) : (
     <button
      type='dubmit'
      onClick={handleSubmit}
      className='btn btn-primary btn-block'
     >
      submit
     </button>
    )}
   </form>
  </section>
 );
}

const CardForm = injectStripe(Checkout);
const StripeWrapper = () => {
 return (
  <StripeProvider apiKey='pk_test_51HBDwvIgbNzLG3IwghjsWW1jTOR5ZLdcP82EBPrrPgMQdhxj0HRhZZeESp7pfRTdaPiczQhx2e4NNi3pSsb4oZ8c00aJsbrgh1'>
   <Elements>
    <CardForm></CardForm>
   </Elements>
  </StripeProvider>
 );
};

export default StripeWrapper;

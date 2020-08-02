import React from 'react';
import {useHistory} from 'react-router-dom';
//strapi function
import loginUser from '../strapi/loginUser';
import registerUser from '../strapi/registerUser';
import {UserState} from '../context/user';
//handleuser

export default function Login() {
 const {userLogin, alert, showAlert} = UserState();

 const history = useHistory();
 const [email, setEmail] = React.useState('');
 const [password, setPassword] = React.useState('');
 const [username, setUsername] = React.useState('default');
 const [isMembered, setIsMembered] = React.useState(true);
 let isEmpty = !email || !password || !username || alert.show;

 const toggleMember = () => {
  setIsMembered((prev) => {
   let isMembered = !prev;
   isMembered ? setUsername('default') : setUsername('');
   return isMembered;
  });
 };

 const handleSubmit = async (e) => {
  // alert
  showAlert({msg: 'przetwarzanie danych, prosze czekac ....'});
  e.preventDefault();
  let response;
  if (isMembered) {
   response = await loginUser({email, password});
  } else {
   response = await registerUser({
    username,
    email,
    password,
   });
  }
  if (response) {
   const {
    jwt: token,
    user: {username},
   } = response.data;
   //pomyslnie zarejestrowany
   const newUser = {token, username};
   userLogin(newUser);
   showAlert({msg: `zalogowałes sie jako : ${username}`});
   history.push('/products');
  } else {
   // blad podczas logowania
   showAlert({
    msg: `Blad podczas logowania....`,
    type: 'danger',
   });
  }
 };

 return (
  <section className='form section'>
   <h2 className='section-title'>{isMembered ? 'zaloguj ' : 'zarejestruj '}</h2>
   <form className='login-form'>
    {/* single input */}
    {!isMembered && (
     <div className='form-control'>
      <label htmlFor='text'>Username</label>
      <input
       type='text'
       id='username'
       value={username}
       onChange={(e) => setUsername(e.target.value)}
      />
     </div>
    )}

    {/* single input */}
    <div className='form-control'>
     <label htmlFor='email'>Email</label>
     <input
      type='email'
      id='email'
      value={email}
      onChange={(e) => setEmail(e.target.value)}
     />
    </div>
    {/* single input */}
    <div className='form-control'>
     <label htmlFor='password'>Password</label>
     <input
      type='password'
      id='password'
      value={password}
      onChange={(e) => setPassword(e.target.value)}
     />
    </div>
    {/* pusty formularz */}
    {isEmpty && (
     <p className='form-empty'>Prosze uzupelnic pola w formularzu</p>
    )}

    {!isEmpty && (
     <button onClick={handleSubmit} className='btn btn-block btn-primary'>
      Submit
     </button>
    )}
    {/* register link */}
    <p className='register-link'>
     {isMembered ? 'need a register' : 'already a member'}
     <button type='button' onClick={toggleMember}>
      click
     </button>
    </p>
   </form>
  </section>
 );
}

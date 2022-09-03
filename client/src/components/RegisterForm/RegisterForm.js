import React, { useState, useEffect, useRef } from 'react';

import { Form, FormInput, Success } from '../FormStyles/Form.styles';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';

import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';
import { Link } from 'react-router-dom';

import USER_API from '../../api/User_API';

import { USERNAME_REGEX, PASSWORD_REGEX, EMAIL_REGEX } from '../../utilities/regex';

function RegisterForm(){
   const userRef = useRef();

   const [ loading, setLoading ] = useState(false);
   const [ firstName, setFirstName ] = useState('');

   const [ lastName, setLastName ] = useState('');

   const [ username, setUsername ] = useState('');
   const [ usernameFocus, setUsernameFocus ] = useState(false);
   const [ validUsername, setValidUsername ] = useState(false);

   const [ email, setEmail ] = useState('');
   const [ emailFocus, setEmailFocus ] = useState(false);
   const [ validEmail, setValidEmail ] = useState(false);

   const [ password, setPassword ] = useState('');
   const [ passwordFocus, setPasswordFocus ] = useState(false);
   const [ validPassword, setValidPassword ] = useState(false);

   const [ confirmPassword, setConfirmPassword ] = useState('');
   const [ confirmPasswordFocus, setConfirmPasswordFocus ] = useState(false);
   const [ validConfirmPassword, setValidConfirmPassword ] = useState(false);

   const [ errorMessage, setErrorMessage ] = useState('');
   const [ success, setSuccess ] = useState(false);

   useEffect(
      () => {
         !loading && !success && userRef.current.focus();
      },
      [ loading, success ]
   );

   useEffect(
      () => {
         const result = USERNAME_REGEX.test(username);
         setValidUsername(result);
      },
      [ username ]
   );

   useEffect(
      () => {
         const result = EMAIL_REGEX.test(email);
         setValidEmail(result);
      },
      [ email ]
   );

   useEffect(
      () => {
         const result = PASSWORD_REGEX.test(password);
         setValidPassword(result);
         const match = password === confirmPassword;
         setValidConfirmPassword(match);
      },
      [ password, confirmPassword ]
   );

   useEffect(
      () => {
         setErrorMessage('');
      },
      [ firstName, lastName, username, email, password, confirmPassword ]
   );

   const clearInputs = () => {
      setFirstName('');
      setLastName('');
      setUsername('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
   };

   const handleSubmit = async (e) => {
      e.preventDefault();
      if (!firstName || !lastName || !username || !email || !password || !confirmPassword) {
         setErrorMessage('All fields must be filled');
         return;
      }
      if (!validUsername) {
         setErrorMessage('Invalid username format.');
         return;
      }
      if (!validEmail) {
         setErrorMessage('Invalid email format.');
         return;
      }
      if (!validPassword) {
         setErrorMessage('Invalid password format.');
         return;
      }
      if (!validConfirmPassword) {
         setErrorMessage('Passwords do not match');
         return;
      }
      try {
         setLoading(true);
         setSuccess(false);
         await USER_API.register({ firstName, lastName, username, email, password, confirmPassword });
         setLoading(false);
         setSuccess(true);
         clearInputs();
      } catch (err) {
         setLoading(false);
         setSuccess(false);
         if (!err.response.status) {
            setErrorMessage('No server responce.');
         } else if (!err.response.data) {
            setErrorMessage('Something went wrong.');
         } else {
            setErrorMessage(err.response.data);
         }
      }
   };

   if (loading) {
      return <LoadingSpinner />;
   }
   if (success) {
      return (
         <Success>
            <h2>Successfully registered</h2>
            <h3>
               <Link to={'/login'}>Login</Link>
            </h3>
         </Success>
      );
   }
   return (
      <section>
         <div>
            <h1>Register new user</h1>
            <h3>
               Already have an account? <Link to='/login'>Login</Link>
            </h3>
         </div>
         <Form onSubmit={handleSubmit}>
            <p className={`errMsg ${!errorMessage && 'hidden'}`}>{errorMessage}</p>
            <FormInput>
               <label htmlFor='firstName'>
                  First Name:
                  <span className={`${!firstName ? 'hidden' : 'valid'}`}>
                     <FontAwesomeIcon icon={firstName ? faCheck : faTimes} />
                  </span>
               </label>
               <input
                  id='firstName'
                  placeholder='First name'
                  required
                  autoComplete='none'
                  ref={userRef}
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
               />
            </FormInput>
            <FormInput>
               <label htmlFor='lastName'>
                  Last Name:
                  <span className={`${!lastName ? 'hidden' : 'valid'}`}>
                     <FontAwesomeIcon icon={lastName ? faCheck : faTimes} />
                  </span>
               </label>
               <input
                  id='lastName'
                  placeholder='Last name'
                  required
                  autoComplete='none'
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
               />
            </FormInput>
            <FormInput>
               <label htmlFor='username'>
                  Username:
                  <span className={`${!validUsername ? 'hidden' : 'valid'}`}>
                     <FontAwesomeIcon icon={faCheck} />
                  </span>
                  <span className={`${validUsername || !username ? 'hidden' : 'invalid'}`}>
                     <FontAwesomeIcon icon={faTimes} />
                  </span>
               </label>
               <input
                  id='username'
                  placeholder='Username'
                  required
                  autoComplete='none'
                  value={username}
                  aria-describedby='usernameNote'
                  onChange={(e) => setUsername(e.target.value)}
                  onFocus={() => setUsernameFocus(true)}
                  onBlur={() => setUsernameFocus(false)}
               />
               <p
                  id='usernameNote'
                  className={`${usernameFocus && username && !validUsername ? 'instructions' : 'hidden'}`}
               >
                  Username must be 6-24 characters long.Must start with a letter.
               </p>
            </FormInput>
            <FormInput>
               <label htmlFor='email'>
                  Email:
                  <span className={`${!validEmail ? 'hidden' : 'valid'}`}>
                     <FontAwesomeIcon icon={faCheck} />
                  </span>
                  <span className={`${validEmail || !email ? 'hidden' : 'invalid'}`}>
                     <FontAwesomeIcon icon={faTimes} />
                  </span>
               </label>
               <input
                  type={'email'}
                  id='email'
                  placeholder='example@email.com'
                  required
                  autoComplete='none'
                  value={email}
                  aria-describedby='emailNote'
                  onChange={(e) => setEmail(e.target.value)}
                  onFocus={() => setEmailFocus(true)}
                  onBlur={() => setEmailFocus(false)}
               />
               <p id='emailNote' className={`${emailFocus && email && !validEmail ? 'instructions' : 'hidden'}`}>
                  Email must match the following template : example@email.com
               </p>
            </FormInput>
            <FormInput>
               <label htmlFor='password'>
                  Password:
                  <span className={`${validPassword ? 'valid' : 'hidden'}`}>
                     <FontAwesomeIcon icon={faCheck} />
                  </span>
                  <span className={`${validPassword || !password ? 'hidden' : 'invalid'}`}>
                     <FontAwesomeIcon icon={faTimes} />
                  </span>
               </label>
               <input
                  type={'password'}
                  id='password'
                  placeholder='Password'
                  required
                  value={password}
                  aria-describedby='passwordNote'
                  onChange={(e) => setPassword(e.target.value)}
                  onFocus={() => setPasswordFocus(true)}
                  onBlur={() => setPasswordFocus(false)}
               />
               <p id='passwordNote' className={`${passwordFocus && !validPassword ? 'instructions' : 'hidden'}`}>
                  Password must be 6-24 characters long , must contain at least one number.
               </p>
            </FormInput>
            <FormInput>
               <label htmlFor='confirmPassword'>
                  Confirm Password:
                  <span className={`${validConfirmPassword && confirmPassword ? 'valid' : 'hidden'}`}>
                     <FontAwesomeIcon icon={faCheck} />
                  </span>
                  <span className={`${validConfirmPassword || !confirmPassword ? 'hidden' : 'invalid'}`}>
                     <FontAwesomeIcon icon={faTimes} />
                  </span>
               </label>
               <input
                  type={'password'}
                  id='confirmPassword'
                  placeholder='Confirm password'
                  required
                  value={confirmPassword}
                  aria-describedby='confirmPasswordNote'
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  onFocus={() => setConfirmPasswordFocus(true)}
                  onBlur={() => setConfirmPasswordFocus(false)}
               />
               <p
                  id='confirmPasswordNote'
                  className={`${confirmPasswordFocus && confirmPassword && !validConfirmPassword
                     ? 'instructions'
                     : 'hidden'}`}
               >
                  Passwords do not match
               </p>
            </FormInput>

            <button
               disabled={
                  !firstName || !lastName || !validUsername || !validEmail || !validPassword || !validConfirmPassword
               }
            >
               Submit
            </button>
         </Form>
      </section>
   );
}

export default RegisterForm;

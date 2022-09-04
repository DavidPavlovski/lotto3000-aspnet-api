import React, { useState, useEffect, useRef } from 'react';

import Form from '../Form/Form';
import FormInput from '../FormInput/FormInput';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';

import { Link } from 'react-router-dom';

import { USERNAME_REGEX, PASSWORD_REGEX, EMAIL_REGEX } from '../../utilities/regex';

function RegisterForm({ registerData, setRegisterData, handleSubmit }) {
	const { firstName, lastName, username, email, password, confirmPassword } = registerData;
	const userRef = useRef();

	const [usernameFocus, setUsernameFocus] = useState(false);
	const [validUsername, setValidUsername] = useState(false);

	const [emailFocus, setEmailFocus] = useState(false);
	const [validEmail, setValidEmail] = useState(false);

	const [passwordFocus, setPasswordFocus] = useState(false);
	const [validPassword, setValidPassword] = useState(false);

	const [confirmPasswordFocus, setConfirmPasswordFocus] = useState(false);
	const [validConfirmPassword, setValidConfirmPassword] = useState(false);

	useEffect(() => {
		userRef.current.focus();
	}, []);

	useEffect(() => {
		const result = USERNAME_REGEX.test(username);
		setValidUsername(result);
	}, [username]);

	useEffect(() => {
		const result = EMAIL_REGEX.test(email);
		setValidEmail(result);
	}, [email]);

	useEffect(() => {
		const result = PASSWORD_REGEX.test(password);
		setValidPassword(result);
		const match = password === confirmPassword;
		setValidConfirmPassword(match);
	}, [password, confirmPassword]);

	const handleChange = (e) => {
		setRegisterData((data) => ({ ...data, [e.target.name]: e.target.value }));
	};
	return (
		<section>
			<div>
				<h1>Register new user</h1>
				<h3>
					Already have an account? <Link to='/login'>Login</Link>
				</h3>
			</div>
			<Form handleSubmit={handleSubmit}>
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
						name='firstName'
						onChange={handleChange}
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
						name='lastName'
						onChange={handleChange}
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
						name='username'
						onChange={handleChange}
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
						name='email'
						onChange={handleChange}
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
						name='password'
						onChange={handleChange}
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
						name='confirmPassword'
						onChange={handleChange}
						onFocus={() => setConfirmPasswordFocus(true)}
						onBlur={() => setConfirmPasswordFocus(false)}
					/>
					<p
						id='confirmPasswordNote'
						className={`${
							confirmPasswordFocus && confirmPassword && !validConfirmPassword ? 'instructions' : 'hidden'
						}`}
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

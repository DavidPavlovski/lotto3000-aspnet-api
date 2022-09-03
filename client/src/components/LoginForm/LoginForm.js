import React, { useState, useRef, useEffect } from 'react';
import useAuth from '../../hooks/useAuth';
import jwt from 'jwt-decode';
import { Form, FormInput, Success } from '../FormStyles/Form.styles';

import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';
import { Link, useNavigate, useLocation } from 'react-router-dom';

import USER_API from '../../api/User_API';

function LoginForm({ setLoggedIn }) {
	const navigate = useNavigate();
	const location = useLocation();
	const from = location.state?.from?.pathname || '/';

	const { setAuth } = useAuth();
	const userRef = useRef();
	const [loading, setLoading] = useState(false);
	const [loginDetails, setLoginDetails] = useState({
		credential: '',
		password: ''
	});
	const [errorMessage, setErrorMessage] = useState('asdasd');
	const [success, setSuccess] = useState(false);

	useEffect(() => {
		!loading && !success && userRef.current.focus();
	}, [loading, success]);

	useEffect(() => {
		setErrorMessage('');
	}, [loginDetails]);

	const handleChange = (e) => {
		setLoginDetails((x) => ({ ...x, [e.target.name]: e.target.value }));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			setLoading(true);
			const res = await USER_API.login(loginDetails);
			const token = jwt(res);
			console.log(token);
			setAuth({
				accessToken: res,
				id: token.nameid,
				firstName: token.given_name,
				lastName: token.family_name,
				username: token.name,
				email: token.email,
				role: token.role,
				expirationDate: token.exp
			});
			setLoginDetails({ credential: '', password: '' });
			setLoading(false);
			setSuccess(true);
			setTimeout(() => {
				navigate(from, { replace: true });
				setLoggedIn(true);
			}, 2000);
		} catch (err) {
			setLoading(false);
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
				<h2>Successfully logged in.</h2>
				<h3>Redirecting...</h3>
			</Success>
		);
	}

	return (
		<section>
			<div>
				<h1>Register new user</h1>
				<h3>
					Dont have an account? <Link to='/register'>Register</Link>
				</h3>
			</div>

			<Form onSubmit={handleSubmit}>
				<p className={`errMsg ${!errorMessage && 'hidden'}`}>{errorMessage}</p>
				<FormInput>
					<label htmlFor='credential'>Username or Email:</label>
					<input
						id='credential'
						placeholder='Username or Email'
						required
						autoComplete='none'
						ref={userRef}
						value={loginDetails.credential}
						type='text'
						name='credential'
						onChange={handleChange}
					/>
				</FormInput>

				<FormInput>
					<label htmlFor='password'>Password:</label>
					<input
						id='password'
						placeholder='Password'
						required
						value={loginDetails.password}
						type='password'
						name='password'
						onChange={handleChange}
					/>
				</FormInput>
				<button>Login</button>
			</Form>
		</section>
	);
}

export default LoginForm;

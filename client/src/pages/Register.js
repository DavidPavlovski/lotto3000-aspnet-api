import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import USER_API from '../api/User_API';
import Notification from '../components/Notification/Notification';

import LoadingSpinner from '../components/LoadingSpinner/LoadingSpinner';
import RegisterForm from '../components/RegisterForm/RegisterForm';
import Success from '../components/Success/Success';

function Register() {
	const [loading, setLoading] = useState(false);
	const [errorMessage, setErrorMessage] = useState('');
	const [success, setSuccess] = useState(false);

	const [registerData, setRegisterData] = useState({
		firstName: '',
		lastName: '',
		username: '',
		email: '',
		password: '',
		confirmPassword: ''
	});

	useEffect(() => {
		setErrorMessage('');
	}, [registerData]);

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (
			!registerData.firstName ||
			!registerData.lastName ||
			!registerData.username ||
			!registerData.email ||
			!registerData.password ||
			!registerData.confirmPassword
		) {
			setErrorMessage('All fields must be filled');
			return;
		}
		try {
			setLoading(true);
			setSuccess(false);
			await USER_API.register(registerData);
			setLoading(false);
			setSuccess(true);
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
				<Link to={'/login'} className='proceed-to-login'>
					Login
				</Link>
			</Success>
		);
	}
	return (
		<React.Fragment>
			{errorMessage && <Notification message={errorMessage} type='error' />}
			<RegisterForm registerData={registerData} setRegisterData={setRegisterData} handleSubmit={handleSubmit} />
		</React.Fragment>
	);
}

export default Register;

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import LoadingSpinner from '../components/LoadingSpinner/LoadingSpinner';
import RegisterForm from '../components/RegisterForm/RegisterForm';
import Notification from '../components/Notification/Notification';
import Success from '../components/Success/Success';

function RegisterAdmin() {
	const axiosPrivate = useAxiosPrivate();
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
			await axiosPrivate.post('/user/registeradmin', JSON.stringify({ ...registerData }));
			setLoading(false);
			setSuccess(true);
			setRegisterData({ firstName: '', lastName: '', username: '', email: '', password: '', confirmPassword: '' });
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
				<h2>Admin Registered successfully</h2>
				<div className='options'>
					<Link to={'/adminpanel'}>Back to admin panel</Link>
					<button onClick={() => setSuccess(false)}>Register new admin</button>
				</div>
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

export default RegisterAdmin;

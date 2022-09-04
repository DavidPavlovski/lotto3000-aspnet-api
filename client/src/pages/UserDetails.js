import React, { useState, useEffect } from 'react';
import useAuth from '../hooks/useAuth';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import { PASSWORD_REGEX, EMAIL_REGEX } from '../utilities/regex';
import LoadingSpinner from '../components/LoadingSpinner/LoadingSpinner';
import Notification from '../components/Notification/Notification';
import Form from '../components/Form/Form';
import FormInput from '../components/FormInput/FormInput';

function UserDetails() {
	const axiosPrivate = useAxiosPrivate();
	const { auth } = useAuth();
	const [userData, setUserData] = useState({
		firstName: auth.firstName,
		lastName: auth.lastName,
		email: auth.email,
		oldPassword: '',
		newPassword: '',
		confirmNewPassword: ''
	});

	const [emailFocus, setEmailFocus] = useState(false);
	const [validEmail, setValidEmail] = useState(false);
	const [passwordFocus, setPasswordFocus] = useState(false);
	const [validPassword, setValidPassword] = useState(false);
	const [confirmPasswordFocus, setConfirmPasswordFocus] = useState(false);
	const [validConfirmPassword, setValidConfirmPassword] = useState(false);

	const [loading, setLoading] = useState(false);
	const [successMessage, setSuccessMessage] = useState('');
	const [errorMessage, setErrorMessage] = useState('');

	const handleChange = (e) => {
		setUserData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
	};
	const handleSubmit = async () => {
		try {
			setLoading(true);
			const res = await axiosPrivate.put(`/user/update/id/${auth.id}`, JSON.stringify(userData));
			setLoading(false);
			setSuccessMessage(res.data);
			setTimeout(() => {
				setSuccessMessage('');
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
	useEffect(() => {
		setErrorMessage('');
	}, [userData]);

	useEffect(() => {
		const result = EMAIL_REGEX.test(userData.email);
		setValidEmail(result);
	}, [userData.email]);

	useEffect(() => {
		const result = PASSWORD_REGEX.test(userData.newPassword);
		setValidPassword(result);
		const match = userData.newPassword === userData.confirmNewPassword;
		setValidConfirmPassword(match);
	}, [userData.newPassword, userData.confirmNewPassword]);

	if (loading) {
		return <LoadingSpinner />;
	}
	return (
		<section>
			{successMessage && <Notification message={successMessage} type='success' />}

			<div>
				<h1>Account details</h1>
			</div>

			<Form handleSubmit={handleSubmit}>
				{errorMessage && <Notification message={errorMessage} type='error' />}
				<FormInput>
					<label htmlFor='firstName'>First Name:</label>
					<input
						id='firstName'
						placeholder='First name'
						required
						autoComplete='none'
						name='firstName'
						value={userData.firstName}
						onChange={handleChange}
					/>
				</FormInput>
				<FormInput>
					<label htmlFor='lastName'>Last Name:</label>
					<input
						id='lastName'
						placeholder='Last name'
						required
						autoComplete='none'
						name='lastName'
						value={userData.lastName}
						onChange={handleChange}
					/>
				</FormInput>

				<FormInput>
					<label htmlFor='email'>
						Email:
						<span className={`${!validEmail ? 'hidden' : 'valid'}`}>
							<FontAwesomeIcon icon={faCheck} />
						</span>
						<span className={`${validEmail || !userData.email ? 'hidden' : 'invalid'}`}>
							<FontAwesomeIcon icon={faTimes} />
						</span>
					</label>
					<input
						type={'email'}
						id='email'
						placeholder='example@email.com'
						required
						autoComplete='none'
						value={userData.email}
						name='email'
						aria-describedby='emailNote'
						onChange={handleChange}
						onFocus={() => setEmailFocus(true)}
						onBlur={() => setEmailFocus(false)}
					/>
					<p
						id='emailNote'
						className={`${emailFocus && userData.email && !validEmail ? 'instructions' : 'hidden'}`}
					>
						Email must match the following template : example@email.com
					</p>
				</FormInput>
				<FormInput>
					<label htmlFor='oldPassword'>Old password:</label>
					<input
						type={'password'}
						id='oldPassword'
						placeholder='Password'
						required
						value={userData.oldPassword}
						name='oldPassword'
						onChange={handleChange}
					/>
				</FormInput>
				<FormInput>
					<label htmlFor='newPassword'>
						New password:
						<span className={`${validPassword ? 'valid' : 'hidden'}`}>
							<FontAwesomeIcon icon={faCheck} />
						</span>
						<span className={`${validPassword || !userData.newPassword ? 'hidden' : 'invalid'}`}>
							<FontAwesomeIcon icon={faTimes} />
						</span>
					</label>
					<input
						type='password'
						id='newPassword'
						placeholder='New password'
						required
						value={userData.newPassword}
						aria-describedby='passwordNote'
						name='newPassword'
						onChange={handleChange}
						onFocus={() => setPasswordFocus(true)}
						onBlur={() => setPasswordFocus(false)}
					/>
					<p id='passwordNote' className={`${passwordFocus && !validPassword ? 'instructions' : 'hidden'}`}>
						Password must be 6-24 characters long , must contain at least one number.
					</p>
				</FormInput>

				<FormInput>
					<label htmlFor='confirmNewPassword'>
						Confirm Password:
						<span className={`${validConfirmPassword && userData.confirmNewPassword ? 'valid' : 'hidden'}`}>
							<FontAwesomeIcon icon={faCheck} />
						</span>
						<span className={`${validConfirmPassword || !userData.confirmNewPassword ? 'hidden' : 'invalid'}`}>
							<FontAwesomeIcon icon={faTimes} />
						</span>
					</label>
					<input
						type={'password'}
						id='confirmNewPassword'
						placeholder='Confirm password'
						required
						value={userData.confirmNewPassword}
						aria-describedby='confirmPasswordNote'
						onChange={handleChange}
						name='confirmNewPassword'
						onFocus={() => setConfirmPasswordFocus(true)}
						onBlur={() => setConfirmPasswordFocus(false)}
					/>
					<p
						id='confirmPasswordNote'
						className={`${
							confirmPasswordFocus && userData.confirmNewPassword && !validConfirmPassword
								? 'instructions'
								: 'hidden'
						}`}
					>
						Passwords do not match
					</p>
				</FormInput>
				<button>Update account details</button>
			</Form>
		</section>
	);
}

export default UserDetails;

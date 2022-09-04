import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import useAxiosPrivate from '../hooks/useAxiosPrivate';

import LoadingSpinner from '../components/LoadingSpinner/LoadingSpinner';
import Notification from '../components/Notification/Notification';
import Success from '../components/Success/Success';
import { Wrapper } from '../styles/NewSession.styles';

function NewSession() {
	const axiosPrivate = useAxiosPrivate();
	const [loading, setLoading] = useState(false);
	const [errorMessage, setErrorMessage] = useState('');
	const [session, setSession] = useState({});
	const [success, setSuccess] = useState(false);

	const handleClick = async () => {
		try {
			setLoading(true);
			const res = await axiosPrivate.post('/lottosession/create');
			setSession(res.data);
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
			setTimeout(() => {
				setErrorMessage('');
			}, 2000);
		}
	};

	if (loading) {
		return <LoadingSpinner />;
	}
	if (success) {
		return (
			<Success>
				<h2>Lotto session created successfully!</h2>
				<h3>The numbers are : {session.winningNumbers.map((x) => x.toString().padStart(2, 0)).join()}</h3>
				<div className='options'>
					<Link to={`/adminpanel/sessiontickets/${session.id}`}>See all submited tickets</Link>
					<Link to={`/sessions/${session.id}`}>See winners</Link>
				</div>
			</Success>
		);
	}
	return (
		<Wrapper>
			{errorMessage && <Notification message={errorMessage} type='error' />}
			<h1>New Lotto Session</h1>
			<button onClick={handleClick}>Roll the numbers</button>
		</Wrapper>
	);
}

export default NewSession;

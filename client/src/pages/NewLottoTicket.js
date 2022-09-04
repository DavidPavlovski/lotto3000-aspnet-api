import React, { useState } from 'react';
import LoadingSpinner from '../components/LoadingSpinner/LoadingSpinner';
import LottoTicket from '../components/LottoTicket/LottoTicket';
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import { Link } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import Notification from '../components/Notification/Notification';

function NewLottoTicket() {
	const { auth } = useAuth();
	const axiosPrivate = useAxiosPrivate();
	const [pickedNumbers, setPickedNumbers] = useState([]);
	const [errorMessage, setErrorMessage] = useState('');
	const [successMessage, setSuccessMessage] = useState('');
	const [loading, setLoading] = useState(false);

	const handleSubmit = async () => {
		try {
			setLoading(true);
			const res = await axiosPrivate.post(
				'/lottoticket/create',
				JSON.stringify({ combination: pickedNumbers.toString() })
			);
			setLoading(false);
			setSuccessMessage(res.data);
			setTimeout(() => {
				setSuccessMessage('');
			}, 2000);
			setPickedNumbers([]);
		} catch (err) {
			setLoading(false);
			setSuccessMessage('');
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
	return (
		<section>
			{successMessage && <Notification message={`${successMessage}. Good Luck!`} type='success'></Notification>}
			<h1>Pick your numbers</h1>
			<h3>
				<Link to={`/user/${auth.id}/tickets`}>See your tickets</Link>
			</h3>
			{errorMessage && <Notification message={errorMessage} type='error' />}
			<LottoTicket setPickedNumbers={setPickedNumbers} pickedNumbers={pickedNumbers} />
			<button className='submit-btn' disabled={pickedNumbers.length !== 7} onClick={handleSubmit}>
				Submit
			</button>
		</section>
	);
}

export default NewLottoTicket;

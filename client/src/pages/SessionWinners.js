import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Table from '../components/Table/Table';

import LottoTickets_API from '../api/LottoTickets_API';
import LoadingSpinner from '../components/LoadingSpinner/LoadingSpinner';
import Notification from '../components/Notification/Notification';

function Winners() {
	const { sessionId } = useParams();
	const [tickets, setTickets] = useState([]);
	const [loading, setLoading] = useState(false);
	const [errorMessage, setErrorMessage] = useState('');

	const prizes = {
		3: '50$ gift card',
		4: '100$ gift card',
		5: '4k TV',
		6: 'Free vacation',
		7: 'JACKPOT!! BRAND NEW CAR.'
	};

	useEffect(() => {
		const fetchData = async () => {
			try {
				const res = await LottoTickets_API.getWinners(sessionId);
				setTickets(res.sort((a, b) => (a.guessedNumbers > b.guessedNumbers ? -1 : 1)));
				setLoading(false);
			} catch (err) {
				setLoading(false);
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
		fetchData();
	}, [sessionId]);
	if (loading) {
		return <LoadingSpinner />;
	}
	return (
		<section>
			<h2>All session winners</h2>
			{errorMessage && <Notification message={errorMessage} type='error' />}
			{tickets?.length ? (
				<Table>
					<thead>
						<tr>
							<th>Player</th>
							<th>Player combination</th>
							<th>Submit date</th>
							<th>Correct numbers</th>
							<th>Prize</th>
						</tr>
					</thead>
					<tbody>
						{tickets.map((ticket) => (
							<tr key={ticket.id}>
								<td>{`${ticket.user.firstName} ${ticket.user.lastName}`}</td>
								<td>{ticket.combination.map((x) => x.toString().padStart(2, 0)).join()}</td>
								<td>{new Date(ticket.created).toLocaleTimeString('mk')}</td>
								<td>{ticket.guessedNumbers}</td>
								<td>{prizes[ticket.guessedNumbers]}</td>
							</tr>
						))}
					</tbody>
				</Table>
			) : (
				<h2>No winners in this lotto session.</h2>
			)}
		</section>
	);
}

export default Winners;

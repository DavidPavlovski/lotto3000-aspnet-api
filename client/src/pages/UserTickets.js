import React, { useState, useEffect } from 'react';

import useAxiosPrivate from '../hooks/useAxiosPrivate';
import LoadingSpinner from '../components/LoadingSpinner/LoadingSpinner';
import Table from '../components/Table/Table';
import { Link } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import Notification from '../components/Notification/Notification';

function UserTickets() {
	const { auth } = useAuth();
	const [loading, setLoading] = useState(true);
	const [tickets, setTickets] = useState([]);
	const axiosPrivate = useAxiosPrivate();
	const [errorMessage, setErrorMessage] = useState('');

	useEffect(() => {
		const fetchData = async () => {
			try {
				setLoading(true);
				const res = await axiosPrivate.get(`lottoticket/getusertickets/${auth.id}`);
				setTickets(res.data);
				setLoading(false);
				console.log(res);
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
	}, [auth.id, axiosPrivate]);
	if (loading) {
		return <LoadingSpinner />;
	}
	return (
		<section>
			<h1>Your tickets</h1>
			{errorMessage && <Notification message={errorMessage} />}
			{tickets?.length ? (
				<Table>
					<thead>
						<tr>
							<th>Ticket #ID</th>
							<th>Combination</th>
							<th>Session numbers</th>
							<th>Guessed numbers</th>
							<th>Date created</th>
							<th>Session</th>
						</tr>
					</thead>
					<tbody>
						{tickets.map((ticket) => (
							<tr key={ticket.id}>
								<td>{ticket.id}</td>
								<td>{ticket.combination.map((num) => num.toString().padStart(2, 0)).join(',')}</td>
								<td>
									{ticket?.lottoSessionId
										? ticket.lottoSession.winningNumbers.map((num) => num.toString().padStart(2, 0)).join(',')
										: 'To be played'}
								</td>
								<td>{ticket.guessedNumbers}</td>
								<td>{new Date(ticket.created).toLocaleDateString('mk')}</td>
								<td>{ticket.lottoSessionId ? <Link to={'/'}>view session</Link> : 'To be played'}</td>
							</tr>
						))}
					</tbody>
				</Table>
			) : (
				<h2>
					You dont have any tickets. <Link to='/newLottoTicket'>Click to play.</Link>
				</h2>
			)}
		</section>
	);
}

export default UserTickets;

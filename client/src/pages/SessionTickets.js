import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useAxiosPrivate from '../hooks/useAxiosPrivate';

import LoadingSpinner from '../components/LoadingSpinner/LoadingSpinner';

import Table from '../components/Table/Table';
import axios, { axiosPrivate } from '../api/axios';
import Notification from '../components/Notification/Notification';

function SessionTickets() {
	const { sessionId } = useParams();
	const [tickets, setTickets] = useState([]);
	const [loading, setLoading] = useState(true);
	const [errorMessage, setErrorMessage] = useState('');

	useEffect(() => {
		const fetchData = async () => {
			try {
				const res = await axiosPrivate.get(`/lottoticket/sessiontickets/${sessionId}`);
				setTickets(res.data.sort((a, b) => (a.guessedNumbers > b.guessedNumbers ? -1 : 1)));
				console.log(res);
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
			<h2>Showing all tickets for Lotto session : #{sessionId}</h2>
			{errorMessage && <Notification message={errorMessage} type='error' />}
			{tickets?.length ? (
				<Table>
					<thead>
						<tr>
							<th>Ticket Id</th>
							<th>Player Id</th>
							<th>Player first name</th>
							<th>Player last name</th>
							<th>Player username</th>
							<th>Player email</th>
							<th>Picked numbers</th>
							<th>Guessed numbers</th>
							<th>Date created</th>
						</tr>
					</thead>
					<tbody>
						{tickets.map((t) => (
							<tr key={t.id}>
								<td>{t.id}</td>
								<td>{t.userId}</td>
								<td>{t.user.firstName}</td>
								<td>{t.user.lastName}</td>
								<td>{t.user.userName}</td>
								<td>{t.user.email}</td>
								<td>{t.combination.map((x) => x.toString().padStart(2, 0)).join()}</td>
								<td>{t.guessedNumbers}</td>
								<td>{new Date(t.created).toLocaleDateString('mk')}</td>
							</tr>
						))}
					</tbody>
				</Table>
			) : (
				<h2>No tickets played for this session.</h2>
			)}
		</section>
	);
}

export default SessionTickets;

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import LottoSessions_API from '../api/LottoSessions_API';
import Notification from '../components/Notification/Notification';
import LoadingSpinner from '../components/LoadingSpinner/LoadingSpinner';
import useAuth from '../hooks/useAuth';
import Table from '../components/Table/Table';

function Sessions() {
	const { auth } = useAuth();
	const [sessions, setSessions] = useState([]);
	const [loading, setLoading] = useState(true);
	const [errorMessage, setErrorMessage] = useState('');

	useEffect(() => {
		const fetchData = async () => {
			try {
				const res = await LottoSessions_API.getSessions();
				setSessions(res);
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
			}
		};
		fetchData();
	}, []);

	if (loading) {
		return <LoadingSpinner />;
	}

	return (
		<section>
			<h2>All past lotto sessions</h2>
			{errorMessage && <Notification message={errorMessage} type='error' />}
			{sessions?.length ? (
				<Table>
					<thead>
						<tr>
							<th>Session Id</th>
							<th>Drawn numbers</th>
							<th>Draw date</th>
							<th>Winners</th>
							{auth.role === 'admin' && <th>See all tickets</th>}
						</tr>
					</thead>
					<tbody>
						{sessions.map((session) => (
							<tr key={session.id}>
								<td>{session.id}</td>
								<td>{session.winningNumbers.map((x) => x.toString().padStart(2, 0)).join()}</td>
								<td>{new Date(session.drawDate).toLocaleDateString('mk')}</td>
								<td>
									<Link to={`/sessions/${session.id}`}>See winners</Link>
								</td>
								{auth.role === 'admin' && (
									<td>
										<Link to={`/adminpanel/sessiontickets/${session.id}`}>See all tickets</Link>
									</td>
								)}
							</tr>
						))}
					</tbody>
				</Table>
			) : (
				<h2>No sessions.</h2>
			)}
		</section>
	);
}

export default Sessions;

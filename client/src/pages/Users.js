import React, { useState, useEffect } from 'react';
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import LoadingSpinner from '../components/LoadingSpinner/LoadingSpinner';
import Table from '../components/Table/Table';
import { Link } from 'react-router-dom';
import Notification from '../components/Notification/Notification';

function Users() {
	const [loading, setLoading] = useState(true);
	const [users, setUsers] = useState([]);
	const axiosPrivate = useAxiosPrivate();
	const [errorMessage, setErrorMessage] = useState('');
	const [successMsg, setSuccessMsg] = useState('');

	useEffect(() => {
		const getUsers = async () => {
			try {
				const res = await axiosPrivate.get('/user/getall');
				setUsers(res.data);
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
		getUsers();
	}, [axiosPrivate]);

	const deleteUser = async (userId) => {
		try {
			setLoading(true);
			const res = await axiosPrivate.delete(`/user/delete/id/${userId}`);
			setUsers((prev) => prev.filter((user) => user.id !== userId));
			setLoading(false);
			setSuccessMsg(res.data);
			setTimeout(() => {
				setSuccessMsg('');
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
	return (
		<section>
			{successMsg && <Notification message={successMsg} type='success' />}
			<h3>
				<Link to={'/adminpanel'}>back to admin panel</Link>
			</h3>
			<h2>All registered users</h2>
			{errorMessage && <Notification message={errorMessage} type='error' />}
			{users?.length ? (
				<Table>
					<thead>
						<tr>
							<th>Id</th>
							<th>First name</th>
							<th>Last name</th>
							<th>Username</th>
							<th>Email</th>
							<th></th>
						</tr>
					</thead>
					<tbody>
						{users.map((user) => (
							<tr key={user.id}>
								<td>{user.id}</td>
								<td>{user.firstName}</td>
								<td>{user.lastName}</td>
								<td>{user.userName}</td>
								<td>{user.email}</td>
								<td>
									<button onClick={() => deleteUser(user.id)}>delete</button>
								</td>
							</tr>
						))}
					</tbody>
				</Table>
			) : (
				<h2>No registered users</h2>
			)}
		</section>
	);
}

export default Users;

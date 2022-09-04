import React from 'react';
import { Link } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import { Wrapper } from '../styles/Panel.Styles';

function UserPanel() {
	const { auth } = useAuth();
	return (
		<Wrapper>
			<h1>Profile page</h1>
			<Link to={`/user/${auth.id}/details`}>Account details</Link>
			<Link to={`/user/${auth.id}/tickets`}>Your lotto tickets</Link>
		</Wrapper>
	);
}

export default UserPanel;

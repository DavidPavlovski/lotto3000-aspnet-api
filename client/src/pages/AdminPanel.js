import React from 'react';
import { Link } from 'react-router-dom';
import { Wrapper } from '../styles/Panel.Styles';

function AdminPanel() {
	return (
		<Wrapper>
			<h1>Admin panel page</h1>
			<Link to={'/sessions'}>See sessions</Link>
			<Link to={'/adminpanel/users'}>See all registered users</Link>
			<Link to={'/adminpanel/registeradmin'}>Register new admin</Link>
			<Link to={'/adminpanel/newlottosession'}>Roll lotto numbers</Link>
		</Wrapper>
	);
}

export default AdminPanel;

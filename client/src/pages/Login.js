import React from 'react';
import LoginForm from '../components/LoginForm/LoginForm';
function Login({ setLoggedIn }) {
	return (
		<>
			<LoginForm setLoggedIn={setLoggedIn} />
		</>
	);
}

export default Login;

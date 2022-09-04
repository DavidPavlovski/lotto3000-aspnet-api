import React from 'react';
import useAuth from '../../hooks/useAuth';
import { Link, useNavigate } from 'react-router-dom';
import { Navigation, Links } from './Navbar.styles';

function Navbar() {
	const { auth, setAuth } = useAuth();
	const navigate = useNavigate();

	const logout = () => {
		setAuth({});
		navigate('/');
	};
	return (
		<Navigation>
			<Link to='/'>Lotto3000</Link>
			{auth.accessToken ? (
				<Links>
					<h4 className='user-details'>
						Signed in as: <span>{auth.username}</span>
					</h4>
					{auth.role === 'admin' ? (
						<Link to={'/adminpanel'} className='btn-link'>
							Admin Panel
						</Link>
					) : (
						<Link to={`/user/${auth.id}`} className='btn-link'>
							Profile
						</Link>
					)}
					<button onClick={logout} className='btn-link'>
						logout
					</button>
				</Links>
			) : (
				<Links>
					<Link to='/register' className='btn-link'>
						Register
					</Link>
					<Link to='/login' className='btn-link'>
						Login
					</Link>
				</Links>
			)}
		</Navigation>
	);
}

export default Navbar;

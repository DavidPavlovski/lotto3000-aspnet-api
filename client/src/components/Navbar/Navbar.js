import React, { useContext } from 'react';
import AuthContext from '../../context/AuthProvider';
import useAuth from '../../hooks/useAuth';
import { Link, useNavigate } from 'react-router-dom';
import { Navigation, Links } from './Navbar.styles';

function Navbar({ isLoggedIn, setLoggedIn }) {
	const auth = useAuth();
	const navigate = useNavigate();
	const { setAuth } = useContext(AuthContext);

	const logout = () => {
		setAuth({});
		navigate('/');
		setLoggedIn(false);
	};
	return (
		<Navigation>
			<Link to='/'>Lotto3000</Link>
			{isLoggedIn ? (
				<Links>
					<button onClick={logout} className='btn'>
						logout
					</button>
				</Links>
			) : (
				<Links>
					<Link to='/register' className='btn'>
						Register
					</Link>
					<Link to='/login' className='btn'>
						Login
					</Link>
				</Links>
			)}
		</Navigation>
	);
}

export default Navbar;

import { Routes, Route } from 'react-router-dom';

import Layout from './pages/Layout';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import Unauthorized from './pages/Unauthorized';

import Navbar from './components/Navbar/Navbar';
import RequireAuth from './components/RequireAuth/RequireAuth';

import { GlobalStyles } from './GlobalStyles';
import React, { useState } from 'react';
import NotFound from './pages/NotFound';
import UserPanel from './pages/UserPanel';
import AdminPanel from './pages/AdminPanel';

function App() {
	const [loggedIn, setLoggedIn] = useState(false);
	return (
		<>
			<Navbar isLoggedIn={loggedIn} setLoggedIn={setLoggedIn} />
			<Routes>
				<Route path='/' element={<Layout />}>
					<Route path='/' element={<Home />} />
					<Route path='/register' element={<Register />} />
					<Route path='/login' element={<Login setLoggedIn={setLoggedIn} />} />
					<Route path='/unauthorized' element={<Unauthorized />} />
					{/* User routes */}
					<Route element={<RequireAuth allowedRole={'user'} />}>
						<Route path='/user' element={<UserPanel />} />
					</Route>
					{/* Admin routes */}
					<Route element={<RequireAuth allowedRole={'admin'} />}>
						<Route path='/adminpanel' element={<AdminPanel />} />
					</Route>
					<Route path='*' element={<NotFound />} />
				</Route>
			</Routes>
			<GlobalStyles />
		</>
	);
}

export default App;

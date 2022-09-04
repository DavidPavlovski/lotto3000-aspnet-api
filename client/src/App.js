import { Routes, Route } from 'react-router-dom';

import Layout from './pages/Layout';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import Unauthorized from './pages/Unauthorized';

import Navbar from './components/Navbar/Navbar';
import RequireAuth from './components/RequireAuth/RequireAuth';

import { GlobalStyles } from './styles/GlobalStyles';
import React from 'react';
import NotFound from './pages/NotFound';
import UserPanel from './pages/UserPanel';
import AdminPanel from './pages/AdminPanel';
import Users from './pages/Users';
import UserDetails from './pages/UserDetails';
import UserTickets from './pages/UserTickets';
import NewLottoTicket from './pages/NewLottoTicket';
import Sessions from './pages/Sessions';
import Winners from './pages/SessionWinners';
import RegisterAdmin from './pages/RegisterAdmin';
import SessionTickets from './pages/SessionTickets';
import NewSession from './pages/NewSession';

function App() {
	return (
		<>
			<Navbar />
			<Routes>
				<Route path='/' element={<Layout />}>
					<Route path='/' element={<Home />} />
					<Route path='/register' element={<Register />} />
					<Route path='/login' element={<Login />} />
					<Route path='/sessions' element={<Sessions />} />
					<Route path='/sessions/:sessionId' element={<Winners />} />
					<Route path='/unauthorized' element={<Unauthorized />} />
					{/* User routes */}
					<Route element={<RequireAuth allowedRole={'user'} />}>
						<Route path='/user/:userId' element={<UserPanel />} />
						<Route path='/user/:userId/details' element={<UserDetails />} />
						<Route path='/user/:userId/tickets' element={<UserTickets />} />
						<Route path='/newLottoTicket' element={<NewLottoTicket />} />
					</Route>
					{/* Admin routes */}
					<Route element={<RequireAuth allowedRole={'admin'} />}>
						<Route path='/adminpanel' element={<AdminPanel />} />
						<Route path='/adminpanel/users' element={<Users />} />
						<Route path='/adminpanel/registeradmin' element={<RegisterAdmin />} />
						<Route path='/adminpanel/sessiontickets/:sessionId' element={<SessionTickets />} />
						<Route path='/adminpanel/newlottosession' element={<NewSession />}></Route>
					</Route>
					<Route path='*' element={<NotFound />} />
				</Route>
			</Routes>
			<GlobalStyles />
		</>
	);
}

export default App;

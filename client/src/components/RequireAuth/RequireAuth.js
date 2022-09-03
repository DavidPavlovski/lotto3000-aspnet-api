import React from 'react';
import { useLocation, Navigate, Outlet } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

function RequireAuth({ allowedRole }) {
	const { auth } = useAuth();
	const location = useLocation();

	return auth.accessToken && allowedRole === auth.role ? (
		<Outlet />
	) : auth.accessToken ? (
		<Navigate to='/unauthorized' state={{ from: location }} replace></Navigate>
	) : (
		<Navigate to='/login' state={{ from: location }} replace />
	);
}

export default RequireAuth;

import { useEffect } from 'react';

import { axiosPrivate } from '../api/axios';

import useAuth from './useAuth';

function useAxiosPrivate() {
	const { auth } = useAuth();
	useEffect(() => {
		const requestIntercept = axiosPrivate.interceptors.request.use(
			(config) => {
				if (!config.headers['Authorization']) {
					config.headers['Authorization'] = `Bearer ${auth.accessToken}`;
				}
				return config;
			},
			(error) => Promise.reject(error)
		);

		const responseIntercept = axiosPrivate.interceptors.response.use(
			(response) => response,
			async (error) => {
				return Promise.reject(error);
			}
		);
		return () => {
			axiosPrivate.interceptors.response.eject(requestIntercept);
			axiosPrivate.interceptors.response.eject(responseIntercept);
		};
	}, [auth]);

	return axiosPrivate;
}

export default useAxiosPrivate;

import axios from './axios';

const LottoSessions_API = {
	getSessions: async function () {
		const endpoint = '/LottoSession/GetAll';
		const res = await axios.get(endpoint);
		return res.data;
	}
};

export default LottoSessions_API;

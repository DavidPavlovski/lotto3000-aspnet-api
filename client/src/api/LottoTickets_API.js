import axios from './axios';

const LottoTickets_API = {
	getWinners: async function (sessionId) {
		const endpoint = `/lottoticket/sessionwinners/${sessionId}`;
		const res = await axios.get(endpoint);
		return res.data;
	}
};

export default LottoTickets_API;

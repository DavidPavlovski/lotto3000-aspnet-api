import axios from 'axios';

const BASE_URL = 'https://localhost:7277/api';

export default axios.create({
   baseURL: BASE_URL
});

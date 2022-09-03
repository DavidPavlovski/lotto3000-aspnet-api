import axios from './axios';

const USER_API = {
   register: async function(obj){
      const endpoint = '/user/register';
      const res = await axios.post(endpoint, JSON.stringify(obj), {
         headers: {
            'Content-Type': 'application/json',
            withCredentials: true
         }
      });
      return res.data;
   },

   login: async function(obj){
      const endpoint = '/user/authenticate';
      const res = await axios.post(endpoint, JSON.stringify(obj), {
         headers: {
            'Content-Type': 'application/json',
            withCredentials: true
         }
      });
      console.log(res);
      return res.data;
   }
};

export default USER_API;

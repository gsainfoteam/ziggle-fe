import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_APP_API_BASE_URL,
});

export default api;

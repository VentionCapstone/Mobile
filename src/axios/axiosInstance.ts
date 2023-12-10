import axios from 'axios';

const BASE_URL = 'http://192.168.43.129:3000/api';

const axiosInstance = axios.create({
  baseURL: BASE_URL,
});

export default axiosInstance;

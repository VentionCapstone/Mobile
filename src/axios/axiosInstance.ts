import axios, { InternalAxiosRequestConfig } from 'axios';

const BASE_URL = 'http://192.168.43.129:3000/api';

const axiosInstance = axios.create({
  baseURL: BASE_URL,
});

axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const accessToken =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI0ZGViYzEzZi01NmI5LTRmZGYtOWMwZi0wMDhjMjA1NDA1YTgiLCJlbWFpbCI6ImtodXNobnVkbWVsaWV2QGdtYWlsLmNvbSIsInJvbGUiOiJVU0VSIiwiaWF0IjoxNzAyNzE5MjgxLCJleHAiOjE3MDMzMjQwODF9.eIOJfJW67dfqKNzkGLbLNbQdawkxBwTuRuIE_4GIRB4';
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;

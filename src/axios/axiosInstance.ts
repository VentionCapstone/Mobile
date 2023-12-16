import axios, { InternalAxiosRequestConfig } from 'axios';
import * as SecureStore from 'expo-secure-store';
import { SecureStoreKeys } from 'src/config/secrets';

import { refreshTokens } from './api';
import { ENDPOINTS } from './endpoints';

const BASE_URL = 'http://192.168.43.129:3000/api';
// const BASE_URL = 'https://booking-api.ddns.net/api';

const axiosInstance = axios.create({
  baseURL: BASE_URL,
});

const endpointsWithoutToken = [ENDPOINTS.auth.signin, ENDPOINTS.auth.signup];

axiosInstance.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    if (config.url && !endpointsWithoutToken.includes(config.url)) {
      const accessToken = await SecureStore.getItemAsync(SecureStoreKeys.ACCESS_TOKEN);

      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const { response, config } = error;
    const userId = await SecureStore.getItemAsync(SecureStoreKeys.USER_ID);

    if (response && !endpointsWithoutToken.includes(config.url)) {
      const { data } = response;

      if (config.url === ENDPOINTS.auth.refresh && data?.error?.statusCode === 401) {
        SecureStore.deleteItemAsync(SecureStoreKeys.REFRESH_TOKEN);
      }

      if (data?.error?.statusCode === 401 && data?.error?.message === 'Unauthorized') {
        config.retry = true;

        try {
          await refreshTokens(userId);
          return await axiosInstance(config);
        } catch (error) {
          return Promise.reject(error);
        }
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;

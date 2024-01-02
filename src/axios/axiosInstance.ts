import axios, { InternalAxiosRequestConfig } from 'axios';
import * as SecureStore from 'expo-secure-store';
import { SecureStorageKey } from 'src/constants/storage';

import { silentTokenRefresh } from './api';
import ENDPOINTS from './endpoints';

const BASE_URL = 'http://192.168.254.70:3000/api';
// const BASE_URL = 'https://booking-vention.ddns.net/api';

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

const endpointsWithoutToken = [ENDPOINTS.signin, ENDPOINTS.signup];

axiosInstance.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    const accessToken = await SecureStore.getItemAsync(SecureStorageKey.ACCESS_TOKEN);
    const refreshToken = await SecureStore.getItemAsync(SecureStorageKey.ACCESS_TOKEN);

    if (config.url && accessToken && !endpointsWithoutToken.includes(config.url)) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    if (config.url && config.url.includes(ENDPOINTS.signout) && refreshToken) {
      config.headers['refresh-token'] = refreshToken;
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

    const { data } = response;

    if (config.url === ENDPOINTS.refresh && data?.error?.statusCode === 401) {
      await SecureStore.deleteItemAsync(SecureStorageKey.REFRESH_TOKEN);
    }

    if (data?.error?.statusCode === 401 && data?.error?.message === 'Unauthorized') {
      if (!config.retry) {
        config.retry = true;

        try {
          await silentTokenRefresh(axiosInstance);
          config.retry = false;
          return axiosInstance(config);
        } catch (error) {
          return Promise.reject(error);
        }
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;

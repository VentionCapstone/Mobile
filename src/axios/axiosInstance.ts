import axios, { InternalAxiosRequestConfig } from 'axios';
import * as SecureStore from 'expo-secure-store';
import { SecureStoreKeys } from 'src/config/secrets';

import ENDPOINTS from './endpoints';

const BASE_URL = 'http://192.168.43.129:3000/api';
// const BASE_URL = 'https://booking-api.ddns.net/api';

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

axiosInstance.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    const accessToken = await SecureStore.getItemAsync(SecureStoreKeys.ACCESS_TOKEN);
    const refreshToken = await SecureStore.getItemAsync(SecureStoreKeys.ACCESS_TOKEN);

    if (
      config.url &&
      accessToken &&
      !config.url.includes(ENDPOINTS.auth.signin && ENDPOINTS.auth.signup)
    ) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    if (config.url && config.url.includes(ENDPOINTS.auth.signout) && refreshToken) {
      config.headers['X-Refresh-Token'] = refreshToken;
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

    const { data } = response;

    if (config.url === ENDPOINTS.auth.refresh && data?.error?.statusCode === 401) {
      SecureStore.deleteItemAsync(SecureStoreKeys.REFRESH_TOKEN);
    }

    if (data?.error?.statusCode === 401 && data?.error?.message === 'Unauthorized') {
      if (!config.retry) {
        config.retry = true;

        try {
          await refreshTokens(userId);
          config.retry = false;
          return await axiosInstance(config);
        } catch (error) {
          return Promise.reject(error);
        }
      }
    }

    return Promise.reject(error);
  }
);

const refreshTokens = async (userId: string | null) => {
  const refreshToken = await SecureStore.getItemAsync(SecureStoreKeys.REFRESH_TOKEN);

  if (refreshToken) {
    try {
      if (userId) {
        const response = await axiosInstance.get(ENDPOINTS.auth.refresh(userId), {
          headers: { Authorization: `Bearer ${refreshToken}` },
        });

        const { data } = response;
        if (data?.accessToken && data?.refreshToken) {
          await SecureStore.setItemAsync(SecureStoreKeys.ACCESS_TOKEN, data.accessToken);
          await SecureStore.setItemAsync(SecureStoreKeys.REFRESH_TOKEN, data.refreshToken);
        }

        return data;
      }

      return null;
    } catch (error) {
      console.log(error);
    }
  }

  return null;
};

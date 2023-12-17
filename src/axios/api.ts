import * as SecureStore from 'expo-secure-store';
import { SecureStoreKeys } from 'src/config/secrets';

import axiosInstance from './axiosInstance';
import { ENDPOINTS } from './endpoints';

export const refreshTokens = async (userId: string | null) => {
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

/* eslint-disable import/no-cycle */
import { AxiosInstance } from 'axios';
import * as SecureStore from 'expo-secure-store';
import { SecureStorageKey } from 'src/constants/storage';

import ENDPOINTS from './endpoints';
import { updateLocalTokens } from './helpers';

export const silentTokenRefresh = async (axiosInstance: AxiosInstance) => {
  const refreshToken = await SecureStore.getItemAsync(SecureStorageKey.REFRESH_TOKEN);
  const userId = await SecureStore.getItemAsync(SecureStorageKey.USER_ID);

  if (refreshToken) {
    try {
      if (userId) {
        const response = await axiosInstance.get(ENDPOINTS.refresh(userId), {
          headers: { Authorization: `Bearer ${refreshToken}` },
        });

        const { data } = response;

        await updateLocalTokens(data.tokens);
        return data;
      }

      return null;
    } catch (error) {
      console.log(error);
    }
  }

  return null;
};

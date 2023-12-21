import * as SecureStore from 'expo-secure-store';
import { SecureStorageKey } from 'src/constants/storage';

export const updateLocalTokens = async ({
  accessToken,
  refreshToken,
}: {
  accessToken: string;
  refreshToken: string;
}) => {
  await SecureStore.setItemAsync(SecureStorageKey.ACCESS_TOKEN, accessToken);
  await SecureStore.setItemAsync(SecureStorageKey.REFRESH_TOKEN, refreshToken);
};

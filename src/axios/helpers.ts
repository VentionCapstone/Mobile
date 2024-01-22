import * as SecureStore from 'expo-secure-store';
import { SecureStorageKey } from 'src/constants/storage';

export const updateLocalTokens = async ({
  access_token,
  refresh_token,
}: {
  access_token: string;
  refresh_token: string;
}) => {
  await SecureStore.setItemAsync(SecureStorageKey.ACCESS_TOKEN, access_token);
  await SecureStore.setItemAsync(SecureStorageKey.REFRESH_TOKEN, refresh_token);
};

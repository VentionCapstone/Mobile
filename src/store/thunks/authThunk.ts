import { AsyncThunkPayloadCreator } from '@reduxjs/toolkit';
import * as SecureStore from 'expo-secure-store';
import { ENDPOINTS, axiosInstance } from 'src/axios';
import { SecureStoreKeys } from 'src/config/secrets';
import { ErrorResponseType, SignInParams, SignUpParams, VerificationParams } from 'src/types';

import { RootState } from '..';

export const signInThunk: AsyncThunkPayloadCreator<
  any,
  SignInParams,
  { rejectValue: ErrorResponseType }
> = async (params, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.post(ENDPOINTS.auth.signin, params);
    if (response) {
      await SecureStore.setItemAsync(
        SecureStoreKeys.ACCESS_TOKEN,
        response.data.tokens.access_token
      );
      await SecureStore.setItemAsync(
        SecureStoreKeys.REFRESH_TOKEN,
        response.data.tokens.refresh_token
      );

      await SecureStore.setItemAsync(SecureStoreKeys.USER_ID, response.data.id);
    }

    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.response.data);
  }
};

export const signUpThunk: AsyncThunkPayloadCreator<
  any,
  SignUpParams,
  { rejectValue: ErrorResponseType }
> = async (params, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.post(ENDPOINTS.auth.signup, params);
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.response.data);
  }
};

export const verifyThunk: AsyncThunkPayloadCreator<
  any,
  VerificationParams,
  { rejectValue: ErrorResponseType }
> = async (params, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.put(ENDPOINTS.auth.verify, params);
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.response.data);
  }
};

export const signOutThunk: AsyncThunkPayloadCreator<
  any,
  undefined,
  { rejectValue: ErrorResponseType }
> = async (_, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.post(ENDPOINTS.auth.signout);

    await SecureStore.deleteItemAsync(SecureStoreKeys.ACCESS_TOKEN);
    await SecureStore.deleteItemAsync(SecureStoreKeys.REFRESH_TOKEN);

    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.response.data);
  }
};

export const refreshThunk: AsyncThunkPayloadCreator<
  any,
  undefined,
  { state: RootState; rejectValue: ErrorResponseType }
> = async (_, { rejectWithValue, getState }) => {
  try {
    const userId = getState().account.user_id ?? '';
    const response = await axiosInstance.get(ENDPOINTS.auth.refresh(userId));

    await SecureStore.setItemAsync(SecureStoreKeys.ACCESS_TOKEN, response.data.tokens.access_token);
    await SecureStore.setItemAsync(
      SecureStoreKeys.REFRESH_TOKEN,
      response.data.tokens.refresh_token
    );
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.response.data.error);
  }
};

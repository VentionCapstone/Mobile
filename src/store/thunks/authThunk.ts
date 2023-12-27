import { AsyncThunkPayloadCreator } from '@reduxjs/toolkit';
import * as SecureStore from 'expo-secure-store';
import { ENDPOINTS, axiosInstance } from 'src/axios';
import { SecureStorageKey } from 'src/constants/storage';
import {
  ApiErrorResponseType,
  ApiSuccessResponseType,
  AuthParams,
  AuthResponse,
  SignInParams,
  SignInResponse,
  SignUpParams,
} from 'src/types';

export const signInThunk: AsyncThunkPayloadCreator<
  ApiSuccessResponseType<SignInResponse>,
  SignInParams,
  { rejectValue: ApiErrorResponseType }
> = async (params, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.post(ENDPOINTS.signin, params);

    if (response.data) {
      await SecureStore.setItemAsync(
        SecureStorageKey.ACCESS_TOKEN,
        response.data.tokens.access_token
      );
      await SecureStore.setItemAsync(
        SecureStorageKey.REFRESH_TOKEN,
        response.data.tokens.refresh_token
      );

      await SecureStore.setItemAsync(SecureStorageKey.USER_ID, response.data.id);
    }

    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.response.data);
  }
};

export const signUpThunk: AsyncThunkPayloadCreator<
  ApiSuccessResponseType<AuthResponse>,
  SignUpParams,
  { rejectValue: ApiErrorResponseType }
> = async (params, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.post(ENDPOINTS.signup, params);
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.response.data);
  }
};

export const verifyEmailThunk: AsyncThunkPayloadCreator<
  ApiSuccessResponseType<AuthResponse>,
  AuthParams,
  { rejectValue: ApiErrorResponseType }
> = async (params, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.put(ENDPOINTS.verify, params.email);
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.response.data);
  }
};

export const signOutThunk: AsyncThunkPayloadCreator<
  any,
  undefined,
  { rejectValue: ApiErrorResponseType }
> = async (_, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.post(ENDPOINTS.signout);

    await SecureStore.deleteItemAsync(SecureStorageKey.ACCESS_TOKEN);
    await SecureStore.deleteItemAsync(SecureStorageKey.REFRESH_TOKEN);

    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.response.data);
  }
};

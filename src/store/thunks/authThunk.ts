import { AsyncThunkPayloadCreator } from '@reduxjs/toolkit';
import * as SecureStore from 'expo-secure-store';
import { ENDPOINTS, axiosInstance } from 'src/axios';
import { ErrorResponseType, SignInParams, SignUpParams } from 'src/types';

export const signInThunk: AsyncThunkPayloadCreator<
  any,
  SignInParams,
  { rejectValue: ErrorResponseType }
> = async (params, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.post(ENDPOINTS.auth.signin, params);
    await SecureStore.setItemAsync('accessToken', response.data.tokens.access_token);
    await SecureStore.setItemAsync('refreshToken', response.data.tokens.refresh_token);
    console.log(response.data);
    return response.data;
  } catch (error: any) {
    console.log(error);
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

export const signOutThunk: AsyncThunkPayloadCreator<
  any,
  undefined,
  { rejectValue: ErrorResponseType }
> = async (_, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.post(ENDPOINTS.auth.signout);
    await SecureStore.deleteItemAsync('accessToken');
    await SecureStore.deleteItemAsync('refreshToken');
    console.log(response.data);
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.response.data);
  }
};

export const refreshThunk: AsyncThunkPayloadCreator<
  any,
  undefined,
  { rejectValue: ErrorResponseType }
> = async (_, { rejectWithValue }) => {
  try {
    const id = 'somestring';
    const response = await axiosInstance.get(ENDPOINTS.auth.refresh(id));

    await SecureStore.setItemAsync('accessToken', response.data.tokens.access_token);
    await SecureStore.setItemAsync('refreshToken', response.data.tokens.refresh_token);
    console.log(response.data);
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.response.data);
  }
};
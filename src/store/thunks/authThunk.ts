import { AsyncThunkPayloadCreator } from '@reduxjs/toolkit';
import { ENDPOINTS, axiosInstance } from 'src/axios';
import { ErrorResponseType, SignInParams, SignUpParams } from 'src/types';

export const signInThunk: AsyncThunkPayloadCreator<
  any,
  SignInParams,
  { rejectValue: ErrorResponseType }
> = async (params, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.post(ENDPOINTS.auth.signin, params);

    return response.data;
  } catch (e: any) {
    console.log(e);
    return rejectWithValue(e.response.data);
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
  } catch (e: any) {
    console.log(e);
    return rejectWithValue(e.response.data);
  }
};

export const signOutThunk: AsyncThunkPayloadCreator<
  any,
  undefined,
  { rejectValue: ErrorResponseType }
> = async (_, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.post(ENDPOINTS.auth.signout);

    return response.data;
  } catch (e: any) {
    console.log(e);
    return rejectWithValue(e.response.data);
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

    return response.data;
  } catch (e: any) {
    console.log(e);
    return rejectWithValue(e.response.data);
  }
};

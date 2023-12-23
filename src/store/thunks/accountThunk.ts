import { AsyncThunkPayloadCreator } from '@reduxjs/toolkit';
import { ENDPOINTS, axiosInstance } from 'src/axios';
import {
  CreateProfileParams,
  ApiErrorResponseType,
  UpdateProfileParams,
  ProfileResponseType,
  ApiSuccessResponseType,
} from 'src/types';

export const createAccountThunk: AsyncThunkPayloadCreator<
  ApiSuccessResponseType<ProfileResponseType>,
  CreateProfileParams,
  { rejectValue: ApiErrorResponseType }
> = async (params, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.post(ENDPOINTS.createProfile, params);

    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.response.data);
  }
};

export const updateAccountThunk: AsyncThunkPayloadCreator<
  ApiSuccessResponseType<ProfileResponseType>,
  UpdateProfileParams,
  { rejectValue: ApiErrorResponseType }
> = async (params, { rejectWithValue }) => {
  try {
    const { id, formValues } = params;
    const response = await axiosInstance.patch(ENDPOINTS.updateProfile(id), formValues);

    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.response.data);
  }
};

export const getAccountDetailsThunk: AsyncThunkPayloadCreator<
  ApiSuccessResponseType<ProfileResponseType>,
  string,
  { rejectValue: ApiErrorResponseType }
> = async (userId, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.get(ENDPOINTS.getProfile(userId));

    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.response.data);
  }
};

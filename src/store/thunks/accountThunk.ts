import { AsyncThunkPayloadCreator } from '@reduxjs/toolkit';
import { ENDPOINTS, axiosInstance } from 'src/axios';
import {
  CreateProfileParams,
  ApiErrorResponseType,
  UpdateProfileParams,
  ProfileResponseType,
  ApiSuccessResponseType,
} from 'src/types';

import type { RootState } from '..';

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
> = async (profileId, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.get(ENDPOINTS.getProfile(profileId));
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.response.data);
  }
};

export const addProfileImageThunk: AsyncThunkPayloadCreator<
  ProfileResponseType,
  FormData,
  { rejectValue: ApiErrorResponseType; state: RootState }
> = async (image, { rejectWithValue, getState }) => {
  try {
    const profileId = getState().account.result.id;

    const response = await axiosInstance.post(ENDPOINTS.addProfileImage(profileId), image, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });

    return response?.data;
  } catch (error: any) {
    return rejectWithValue(error.response.data);
  }
};

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
  ProfileResponseType,
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
  ProfileResponseType,
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
  { profileId: string; image: FormData },
  { rejectValue: ApiErrorResponseType; state: RootState }
> = async ({ profileId, image }, { rejectWithValue, getState }) => {
  try {
    const response = await axiosInstance.post(ENDPOINTS.addProfileImage(profileId), image, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });

    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.response.data);
  }
};

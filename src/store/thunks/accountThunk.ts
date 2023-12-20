import { AsyncThunkPayloadCreator } from '@reduxjs/toolkit';
import { ENDPOINTS, axiosInstance } from 'src/axios';
import { CreateProfileParams, ErrorResponseType, UpdateProfileParams } from 'src/types';

export const createAccountThunk: AsyncThunkPayloadCreator<
  any,
  CreateProfileParams,
  { rejectValue: ErrorResponseType }
> = async (params, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.post(ENDPOINTS.createProfile, params);

    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.response.data);
  }
};

export const updateAccountThunk: AsyncThunkPayloadCreator<
  any,
  UpdateProfileParams,
  { rejectValue: ErrorResponseType }
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
  any,
  string | null,
  { rejectValue: ErrorResponseType }
> = async (userId, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.get(ENDPOINTS.getProfile(userId));

    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.response.data);
  }
};

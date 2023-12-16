import { AsyncThunkPayloadCreator } from '@reduxjs/toolkit';
import { ENDPOINTS, axiosInstance } from 'src/axios';
import { CreateProfileParams, ErrorResponseType, UpdateProfileParams } from 'src/types';

export const createAccountThunk: AsyncThunkPayloadCreator<
  any,
  CreateProfileParams,
  { rejectValue: ErrorResponseType }
> = async (params, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.post(ENDPOINTS.account.create, params);

    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.response.data.error);
  }
};

export const updateAccountThunk: AsyncThunkPayloadCreator<
  any,
  UpdateProfileParams,
  { rejectValue: ErrorResponseType }
> = async (params, { rejectWithValue }) => {
  try {
    const userId = '4debc13f-56b9-4fdf-9c0f-008c205405a8';
    const response = await axiosInstance.patch(ENDPOINTS.account.update(userId), params);

    return response.data;
  } catch (error: any) {
    console.log(error.response.data);
    return rejectWithValue(error.response.data.error);
  }
};

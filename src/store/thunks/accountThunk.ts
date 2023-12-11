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
    console.log(error);
    return rejectWithValue(error.response.data);
  }
};

export const updateAccountThunk: AsyncThunkPayloadCreator<
  any,
  UpdateProfileParams,
  { rejectValue: ErrorResponseType }
> = async (params, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.put(ENDPOINTS.account.update, params);

    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.response.data);
  }
};

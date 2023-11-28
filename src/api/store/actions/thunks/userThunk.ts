import { AsyncThunkPayloadCreator } from '@reduxjs/toolkit';
import { ENDPOINTS, axiosInstance } from 'src/api/axios';
import { ErrorResponseType } from 'src/api/types';
import { ProfileFormValues } from 'src/types';

export const createProfileThunk: AsyncThunkPayloadCreator<
  any,
  ProfileFormValues,
  { rejectValue: ErrorResponseType }
> = async (params, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.post(ENDPOINTS.profile.create, params);

    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.response.data);
  }
};

export const updateProfileThunk: AsyncThunkPayloadCreator<
  any,
  ProfileFormValues,
  { rejectValue: ErrorResponseType }
> = async (params, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.put(ENDPOINTS.profile.update, params);

    return response.data;
  } catch (error: any) {
    console.log(error.response.data.error);
    return rejectWithValue(error.response.data);
  }
};

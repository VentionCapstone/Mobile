import { AsyncThunkPayloadCreator } from '@reduxjs/toolkit';
import { ENDPOINTS, axiosInstance } from 'src/axios';
import { ApiErrorResponseType, ApiSuccessResponseType, User } from 'src/types';

export const getUserDetailsThunk: AsyncThunkPayloadCreator<
  ApiSuccessResponseType<User>,
  string,
  { rejectValue: ApiErrorResponseType }
> = async (userId, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.get(ENDPOINTS.getUserDetails(userId));

    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.response.data);
  }
};

import { AsyncThunkPayloadCreator } from '@reduxjs/toolkit';
import { ENDPOINTS, axiosInstance } from 'src/axios';
import { ErrorResponseType } from 'src/types';

export const getUserDetailsThunk: AsyncThunkPayloadCreator<
  any,
  string | null,
  { rejectValue: ErrorResponseType }
> = async (userId, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.get(ENDPOINTS.user.getUser(userId));
    console.log(response.data);
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.response.data);
  }
};

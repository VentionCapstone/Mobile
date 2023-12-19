import { AsyncThunkPayloadCreator } from '@reduxjs/toolkit';
import { axiosInstance } from 'src/axios/axiosInstance';
import ENDPOINTS from 'src/axios/endpoints';
import { ErrorResponseType } from 'src/types';

export const getUserDetailsThunk: AsyncThunkPayloadCreator<
  any,
  string | null,
  { rejectValue: ErrorResponseType }
> = async (userId, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.get(ENDPOINTS.user.getUser(userId));

    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.response.data);
  }
};

import { AsyncThunkPayloadCreator } from '@reduxjs/toolkit';
import { ENDPOINTS, axiosInstance } from 'src/axios';
import { ApiErrorResponseType, ApiSuccessResponseType, HostProfile } from 'src/types';

export const getHostProfileThunk: AsyncThunkPayloadCreator<
  ApiSuccessResponseType<HostProfile>,
  string,
  { rejectValue: ApiErrorResponseType }
> = async (hostId, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.get(ENDPOINTS.getHostProfile(hostId));
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.response.data);
  }
};

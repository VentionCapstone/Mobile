import { AsyncThunkPayloadCreator } from '@reduxjs/toolkit';
import { ENDPOINTS, axiosInstance } from 'src/axios';
import {
  AccommodationsListResponse,
  ApiErrorResponseType,
  GetAccommodationQueryParams,
} from 'src/types';

export const getListOfAccommodationsThunk: AsyncThunkPayloadCreator<
  AccommodationsListResponse,
  GetAccommodationQueryParams,
  { rejectValue: ApiErrorResponseType }
> = async (params, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.get(ENDPOINTS.getAllAccomodations, { params });

    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.response.data);
  }
};

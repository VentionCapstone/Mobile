import { AsyncThunkPayloadCreator } from '@reduxjs/toolkit';
import { ENDPOINTS, axiosInstance } from 'src/axios';
import { ApiErrorResponseType, ApiSuccessResponseType, ExploreListItem } from 'src/types';

export const getListOfAccommodationsThunk: AsyncThunkPayloadCreator<
  ApiSuccessResponseType<ExploreListItem[]>,
  string,
  { rejectValue: ApiErrorResponseType }
> = async (params, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.get(ENDPOINTS.getAllAccomodations(params));

    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.response.data);
  }
};

export const getUpdatedListOfAccommodationsThunk: AsyncThunkPayloadCreator<
  ApiSuccessResponseType<ExploreListItem[]>,
  string,
  { rejectValue: ApiErrorResponseType }
> = async (params, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.get(ENDPOINTS.getAllAccomodations(params));

    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.response.data);
  }
};

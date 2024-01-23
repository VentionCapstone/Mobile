import { AsyncThunkPayloadCreator } from '@reduxjs/toolkit';
import { ENDPOINTS, axiosInstance } from 'src/axios';
import {
  ApiErrorResponseType,
  ApiSuccessResponseType,
  ExploreListItem,
  SearchValues,
} from 'src/types';
import { adaptParamsToURLEncoded } from 'src/utils';

export const getListOfAccommodationsThunk: AsyncThunkPayloadCreator<
  ApiSuccessResponseType<ExploreListItem[]>,
  SearchValues,
  { rejectValue: ApiErrorResponseType }
> = async (params, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.get(
      `${ENDPOINTS.getAllAccomodations}?${adaptParamsToURLEncoded(params)}`
    );

    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.response.data);
  }
};

export const getUpdatedListOfAccommodationsThunk: AsyncThunkPayloadCreator<
  ApiSuccessResponseType<ExploreListItem[]>,
  SearchValues,
  { rejectValue: ApiErrorResponseType }
> = async (params, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.get(
      `${ENDPOINTS.getAllAccomodations}?${adaptParamsToURLEncoded(params)}`
    );

    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.response.data);
  }
};

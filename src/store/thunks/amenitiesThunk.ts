import { AsyncThunkPayloadCreator } from '@reduxjs/toolkit';
import { ENDPOINTS, axiosInstance } from 'src/axios';
import { ApiErrorResponseType, ApiSuccessResponseType } from 'src/types';
import {
  AccommodationAmenitiesResponse,
  EditAmenitiesResponse,
  UpdateAmenitiesParams,
} from 'src/types/amenities';

export const addAmenitiesThunk: AsyncThunkPayloadCreator<
  ApiSuccessResponseType<AccommodationAmenitiesResponse>,
  UpdateAmenitiesParams,
  { rejectValue: ApiErrorResponseType }
> = async (params, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.post(
      ENDPOINTS.accomodationAmenities(params.accomodationId),
      params.data
    );

    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.response.data);
  }
};

export const updateAmenitiesThunk: AsyncThunkPayloadCreator<
  ApiSuccessResponseType<EditAmenitiesResponse>,
  UpdateAmenitiesParams,
  { rejectValue: ApiErrorResponseType }
> = async (params, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.post(
      ENDPOINTS.accomodationAmenities(params.accomodationId),
      params.data
    );

    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.response.data);
  }
};

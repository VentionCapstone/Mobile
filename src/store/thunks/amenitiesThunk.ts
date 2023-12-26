import { AsyncThunkPayloadCreator } from '@reduxjs/toolkit';
import { ENDPOINTS, axiosInstance } from 'src/axios';
import { ApiErrorResponseType, ApiSuccessResponseType } from 'src/types';
import { AmenitiesParams, AmenitiesResponseData } from 'src/types/amenities';

export const getAmenitiesListThunk: AsyncThunkPayloadCreator<
  ApiSuccessResponseType<string>,
  AmenitiesParams,
  { rejectValue: ApiErrorResponseType }
> = async (_, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.get(ENDPOINTS.getAmenitiesList);

    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.response.data);
  }
};

export const getAmenitiesThunk: AsyncThunkPayloadCreator<
  ApiSuccessResponseType<AmenitiesResponseData>,
  AmenitiesParams,
  { rejectValue: ApiErrorResponseType }
> = async (params, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.get(ENDPOINTS.AccomodationAmenities(params.id));

    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.response.data);
  }
};

export const addAmenitiesThunk: AsyncThunkPayloadCreator<
  ApiSuccessResponseType<AmenitiesResponseData>,
  AmenitiesParams,
  { rejectValue: ApiErrorResponseType }
> = async (params, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.post(
      ENDPOINTS.AccomodationAmenities(params.id),
      params.data
    );

    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.response.data);
  }
};

export const updateAmenitiesThunk: AsyncThunkPayloadCreator<
  ApiSuccessResponseType<AmenitiesResponseData>,
  AmenitiesParams,
  { rejectValue: ApiErrorResponseType }
> = async (params, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.post(
      ENDPOINTS.AccomodationAmenities(params.id),
      params.data
    );

    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.response.data);
  }
};

export const deleteAmenitiesThunk: AsyncThunkPayloadCreator<
  ApiSuccessResponseType<AmenitiesResponseData>,
  AmenitiesParams,
  { rejectValue: ApiErrorResponseType }
> = async (params, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.put(ENDPOINTS.AccomodationAmenities(params.id));

    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.response.data);
  }
};

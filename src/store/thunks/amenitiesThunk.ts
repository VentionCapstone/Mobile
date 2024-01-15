import { AsyncThunkPayloadCreator } from '@reduxjs/toolkit';
import { ENDPOINTS, axiosInstance } from 'src/axios';
import { ApiErrorResponseType, ApiSuccessResponseType } from 'src/types';
import {
  AccommodationAmenitiesResponse,
  AmenitiesParams,
  EditAmenitiesResponse,
  UpdateAmenitiesParams,
} from 'src/types/amenities';

export const getAmenitiesListThunk: AsyncThunkPayloadCreator<
  ApiSuccessResponseType<string[]>,
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
  ApiSuccessResponseType<AccommodationAmenitiesResponse>,
  AmenitiesParams,
  { rejectValue: ApiErrorResponseType }
> = async (params, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.get(
      ENDPOINTS.AccomodationAmenities(params.accomodationId)
    );

    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.response.data);
  }
};

export const addAmenitiesThunk: AsyncThunkPayloadCreator<
  ApiSuccessResponseType<AccommodationAmenitiesResponse>,
  UpdateAmenitiesParams,
  { rejectValue: ApiErrorResponseType }
> = async (params, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.post(
      ENDPOINTS.AccomodationAmenities(params.accomodationId),
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
      ENDPOINTS.AccomodationAmenities(params.accomodationId),
      params.data
    );

    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.response.data);
  }
};

export const deleteAmenitiesThunk: AsyncThunkPayloadCreator<
  ApiSuccessResponseType<AccommodationAmenitiesResponse>,
  AmenitiesParams,
  { rejectValue: ApiErrorResponseType }
> = async (params, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.put(
      ENDPOINTS.AccomodationAmenities(params.accomodationId)
    );

    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.response.data);
  }
};

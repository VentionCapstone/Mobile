import { AsyncThunkPayloadCreator } from '@reduxjs/toolkit';
import { ENDPOINTS, axiosInstance } from 'src/axios';
import { CreateAccommodationParams, ErrorResponseType, UpdateAccommodationParams } from 'src/types';

export const createAccommodationThunk: AsyncThunkPayloadCreator<
  any,
  CreateAccommodationParams,
  { rejectValue: ErrorResponseType }
> = async (params, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.post(ENDPOINTS.accommodation.create, params);

    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.response.data.error);
  }
};

export const updateAccommodationThunk: AsyncThunkPayloadCreator<
  any,
  UpdateAccommodationParams,
  { rejectValue: ErrorResponseType }
> = async (params, { rejectWithValue }) => {
  try {
    const accommodationId = '1';
    const response = await axiosInstance.put(
      ENDPOINTS.accommodation.update(accommodationId),
      params
    );

    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.response.data.error);
  }
};

export const deleteAccommodationThunk: AsyncThunkPayloadCreator<
  any,
  string,
  { rejectValue: ErrorResponseType }
> = async (accommodationId, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.delete(ENDPOINTS.accommodation.delete('1'));

    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.response.data);
  }
};

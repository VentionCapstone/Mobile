import { AsyncThunkPayloadCreator } from '@reduxjs/toolkit';
import { ENDPOINTS, axiosInstance } from 'src/axios';
import { CreateAccommodationParams, ErrorResponseType, UpdateAccommodationParams } from 'src/types';

export const createAccommodationThunk: AsyncThunkPayloadCreator<
  any,
  CreateAccommodationParams,
  { rejectValue: ErrorResponseType }
> = async (params, { rejectWithValue }) => {
  try {
    console.log(params);
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
    const response = await axiosInstance.delete(ENDPOINTS.accommodation.delete(accommodationId));

    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.response.data);
  }
};

export const uploadAccommodationImageThunk: AsyncThunkPayloadCreator<
  any,
  any,
  { rejectValue: ErrorResponseType }
> = async (params, { rejectWithValue }) => {
  try {
    const { accommodationId, imageData } = params;

    const formData = new FormData();
    formData.append('file', imageData as any);

    const response = await axiosInstance.post(
      ENDPOINTS.accommodation.uploadImage(accommodationId),
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );

    return response.data;
  } catch (error: any) {
    console.log(error.response.data);
    return rejectWithValue(error.response.data.error);
  }
};

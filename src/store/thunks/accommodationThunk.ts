import { AsyncThunkPayloadCreator } from '@reduxjs/toolkit';
import { ENDPOINTS, axiosInstance } from 'src/axios';
import { CreateAccommodationParams, ErrorResponseType, UpdateAccommodationParams } from 'src/types';

export const createAccommodationThunk: AsyncThunkPayloadCreator<
  any,
  CreateAccommodationParams,
  { rejectValue: ErrorResponseType }
> = async (params, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.post(ENDPOINTS.createAccomodation, params);

    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.response.data);
  }
};

export const updateAccommodationThunk: AsyncThunkPayloadCreator<
  any,
  UpdateAccommodationParams,
  { rejectValue: ErrorResponseType }
> = async (params, { rejectWithValue }) => {
  try {
    const { accommodationId, accommodation, address } = params;

    const response = await axiosInstance.put(ENDPOINTS.updateAccomodation(accommodationId), {
      accommodation,
      address,
    });

    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.response.data);
  }
};

export const deleteAccommodationThunk: AsyncThunkPayloadCreator<
  any,
  string,
  { rejectValue: ErrorResponseType }
> = async (accommodationId, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.delete(ENDPOINTS.deleteAccomodation(accommodationId));

    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.response.data);
  }
};

export const addAccommodationImageThunk: AsyncThunkPayloadCreator<
  any,
  any,
  { rejectValue: ErrorResponseType }
> = async (params, { rejectWithValue }) => {
  try {
    const { accommodationId, imageData } = params;

    const formData = new FormData();
    formData.append('file', imageData as any);

    const response = await axiosInstance.post(
      ENDPOINTS.uploadAccomodationImage(accommodationId),
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );

    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.response.data);
  }
};

export const getAccommodationThunk: AsyncThunkPayloadCreator<
  any,
  string,
  { rejectValue: ErrorResponseType }
> = async (accommodationId, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.get(ENDPOINTS.getAccomodationById(accommodationId));

    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.response.data);
  }
};

export const getMyAccommodationsThunk: AsyncThunkPayloadCreator<
  any,
  undefined,
  { rejectValue: ErrorResponseType }
> = async (_, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.get(ENDPOINTS.getMyAccommodations);

    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.response.data);
  }
};

import { AsyncThunkPayloadCreator } from '@reduxjs/toolkit';
import { axiosInstance } from 'src/axios/axiosInstance';
import ENDPOINTS from 'src/axios/endpoints';
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

    const response = await axiosInstance.put(ENDPOINTS.accommodation.update(accommodationId), {
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
    const response = await axiosInstance.delete(ENDPOINTS.accommodation.delete(accommodationId));

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
    return rejectWithValue(error.response.data);
  }
};

export const getAccommodationThunk: AsyncThunkPayloadCreator<
  any,
  string,
  { rejectValue: ErrorResponseType }
> = async (accommodationId, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.get(ENDPOINTS.accommodation.getById(accommodationId));

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
    const response = await axiosInstance.get(ENDPOINTS.accommodation.getMyAccommodations);

    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.response.data);
  }
};

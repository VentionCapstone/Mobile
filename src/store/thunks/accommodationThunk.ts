import { AsyncThunkPayloadCreator } from '@reduxjs/toolkit';
import { ENDPOINTS, axiosInstance } from 'src/axios';
import { CreateAccommodationparams, ErrorResponseType, UpdateAccommodationparams } from 'src/types';

export const createAccommodationThunk: AsyncThunkPayloadCreator<
  any,
  CreateAccommodationparams,
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
  UpdateAccommodationparams,
  { rejectValue: ErrorResponseType }
> = async (params, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.put(ENDPOINTS.accommodation.update('1'), params);

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
    const response = await axiosInstance.delete(ENDPOINTS.accommodation.delete('1'));

    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.response.data);
  }
};

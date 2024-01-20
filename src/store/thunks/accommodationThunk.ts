import { AsyncThunkPayloadCreator } from '@reduxjs/toolkit';
import { ENDPOINTS, axiosInstance } from 'src/axios';
import {
  CreateAccommodationParams,
  ApiErrorResponseType,
  UpdateAccommodationParams,
  ApiSuccessResponseType,
  Accommodation,
  AccommodationFullView,
} from 'src/types';

export const createAccommodationThunk: AsyncThunkPayloadCreator<
  ApiSuccessResponseType<Accommodation>,
  CreateAccommodationParams,
  { rejectValue: ApiErrorResponseType }
> = async (params, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.post(ENDPOINTS.createAccomodation, params);

    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.response.data);
  }
};

export const updateAccommodationThunk: AsyncThunkPayloadCreator<
  ApiSuccessResponseType<Accommodation>,
  UpdateAccommodationParams,
  { rejectValue: ApiErrorResponseType }
> = async (params, { rejectWithValue }) => {
  try {
    const { accommodationId, accommodation } = params;

    const response = await axiosInstance.put(
      ENDPOINTS.updateAccomodation(accommodationId),
      accommodation
    );

    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.response.data);
  }
};

export const deleteAccommodationThunk: AsyncThunkPayloadCreator<
  string,
  string,
  { rejectValue: ApiErrorResponseType }
> = async (accommodationId, { rejectWithValue }) => {
  try {
    await axiosInstance.delete(ENDPOINTS.deleteAccomodation(accommodationId));

    return accommodationId;
  } catch (error: any) {
    return rejectWithValue(error.response.data);
  }
};

export const uploadAccommodationImagesThunk: AsyncThunkPayloadCreator<
  any,
  { accommodationId: string; formData: FormData },
  { rejectValue: ApiErrorResponseType }
> = async (params, { rejectWithValue }) => {
  try {
    const { accommodationId, formData } = params;

    const response = await axiosInstance.post(
      ENDPOINTS.uploadAccomodationImage(accommodationId),
      formData,
      { headers: { 'Content-Type': 'multipart/form-data' } }
    );

    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.response?.data);
  }
};

export const getAccommodationThunk: AsyncThunkPayloadCreator<
  ApiSuccessResponseType<AccommodationFullView>,
  string,
  { rejectValue: ApiErrorResponseType }
> = async (accommodationId, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.get(ENDPOINTS.getAccomodationById(accommodationId));

    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.response.data);
  }
};

export const getMyAccommodationsThunk: AsyncThunkPayloadCreator<
  ApiSuccessResponseType<Accommodation[]>,
  string,
  { rejectValue: ApiErrorResponseType }
> = async (userId, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.get(ENDPOINTS.getMyAccommodations(userId));

    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.response.data);
  }
};

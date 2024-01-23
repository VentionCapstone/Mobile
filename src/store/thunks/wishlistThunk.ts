import { AsyncThunkPayloadCreator } from '@reduxjs/toolkit';
import { ENDPOINTS, axiosInstance } from 'src/axios';
import { ApiErrorResponseType, ApiSuccessResponseType, Wishlist } from 'src/types';

export const getWishlistsThunk: AsyncThunkPayloadCreator<
  ApiSuccessResponseType<Wishlist[]>,
  undefined,
  { rejectValue: ApiErrorResponseType }
> = async (_, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.get(ENDPOINTS.getWishlists);

    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.response.data);
  }
};

export const addToWishlistThunk: AsyncThunkPayloadCreator<
  ApiSuccessResponseType,
  string,
  { rejectValue: ApiErrorResponseType }
> = async (accommodationId, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.post(ENDPOINTS.addToWishlist(accommodationId));

    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.response.data);
  }
};

export const removeFromWishlistThunk: AsyncThunkPayloadCreator<
  string,
  string,
  { rejectValue: ApiErrorResponseType }
> = async (accommodationId, { rejectWithValue }) => {
  try {
    await axiosInstance.delete(ENDPOINTS.addToWishlist(accommodationId));

    return accommodationId;
  } catch (error: any) {
    return rejectWithValue(error.response.data);
  }
};

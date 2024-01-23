import { AsyncThunkPayloadCreator } from '@reduxjs/toolkit';
import { ENDPOINTS, axiosInstance } from 'src/axios';
import { AccommodationsListResponse, ApiErrorResponseType } from 'src/types';

export enum SortOrder {
  ASC = 'asc',
  DESC = 'desc',
}

interface GetAccommodationQueryParams {
  orderByPrice?: SortOrder;
  orderByRoom?: SortOrder;
  orderByPeople?: SortOrder;
  minPrice?: number;
  maxPrice?: number;
  minRooms?: number;
  maxRooms?: number;
  minPeople?: number;
  maxPeople?: number;
  location?: string;
  checkInDate?: Date;
  checkOutDate?: Date;
  page?: number;
  limit?: number;
}

export const getListOfAccommodationsThunk: AsyncThunkPayloadCreator<
  AccommodationsListResponse,
  GetAccommodationQueryParams,
  { rejectValue: ApiErrorResponseType }
> = async (params, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.get(ENDPOINTS.getAllAccomodations, { params });

    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.response.data);
  }
};

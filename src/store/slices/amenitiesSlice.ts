import { createSlice } from '@reduxjs/toolkit';
import { AMENITIES_DEFAULT_VALUES } from 'src/screens/explore/AccommodationDetails/AccommodationDetails.utils.ts';
import { StateType } from 'src/types';
import { AccommodationAmenitiesResponse } from 'src/types/amenities';

import { onError, onPending } from '../stateResults';
import { AsyncThunks } from '../thunks';

interface AmenitiesStateType extends StateType<AccommodationAmenitiesResponse | string> {}

const initialState: AmenitiesStateType = {
  error: null,
  pending: false,
  result: AMENITIES_DEFAULT_VALUES,
};

const amenitiesSlice = createSlice({
  name: 'amenities',
  initialState,
  reducers: {
    reset: () => initialState,
    clearError: (state) => {
      state.error = null;
    },
    setAmenities: (state, action) => {
      state.result = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(AsyncThunks.addAmenitiesThunk.pending, onPending);
    builder.addCase(AsyncThunks.addAmenitiesThunk.fulfilled, (state, action) => {
      state.pending = false;
      state.result = action.payload.data;
    });
    builder.addCase(AsyncThunks.addAmenitiesThunk.rejected, onError);

    builder.addCase(AsyncThunks.updateAmenitiesThunk.pending, onPending);
    builder.addCase(AsyncThunks.updateAmenitiesThunk.fulfilled, (state, action) => {
      state.pending = false;
      state.result = action.payload.data;
    });
    builder.addCase(AsyncThunks.updateAmenitiesThunk.rejected, onError);
  },
});

export const amenitiesActions = amenitiesSlice.actions;
export const amenitiesReducer = amenitiesSlice.reducer;

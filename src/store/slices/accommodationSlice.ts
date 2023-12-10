import { createSlice } from '@reduxjs/toolkit';
import { StateType } from 'src/types';

import { onError, onPending } from '../stateResults';
import { AsyncThunks } from '../thunks';

type AccommodationStateType = StateType<any> & {
  result: null;
};

const initialState: AccommodationStateType = {
  error: null,
  pending: false,
  result: null,
};

const SLICE_NAME = 'accommodation';

const accommodationSlice = createSlice({
  name: SLICE_NAME,
  initialState,
  reducers: {
    reset: () => initialState,

    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(AsyncThunks.createAccommodation.pending, onPending);
    builder.addCase(AsyncThunks.createAccommodation.fulfilled, (state, action) => {
      state.pending = false;
    });
    builder.addCase(AsyncThunks.createAccommodation.rejected, onError);

    builder.addCase(AsyncThunks.updateAccommodation.pending, onPending);
    builder.addCase(AsyncThunks.updateAccommodation.fulfilled, (state, action) => {
      state.pending = false;
    });
    builder.addCase(AsyncThunks.updateAccommodation.rejected, onError);

    builder.addCase(AsyncThunks.deleteAccommodation.pending, onPending);
    builder.addCase(AsyncThunks.deleteAccommodation.fulfilled, (state, action) => {
      state.pending = false;
    });
    builder.addCase(AsyncThunks.deleteAccommodation.rejected, onError);
  },
});

export const accommodationActions = accommodationSlice.actions;
export const accommodationReducer = accommodationSlice.reducer;

import { createSlice } from '@reduxjs/toolkit';
import { Accommodation, StateType } from 'src/types';

import { onError, onPending } from '../stateResults';
import { AsyncThunks } from '../thunks';

type AccommodationStateType = StateType<Accommodation[]>;

const initialState: AccommodationStateType = {
  error: null,
  pending: false,
  result: null,
};

const accommodationsListSlice = createSlice({
  name: 'accommodationsList',
  initialState,
  reducers: {
    reset: () => initialState,

    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(AsyncThunks.getMyAccommodations.pending, onPending);
    builder.addCase(AsyncThunks.getMyAccommodations.fulfilled, (state, action) => {
      state.pending = false;
      state.result = action.payload.data;
    });
    builder.addCase(AsyncThunks.getMyAccommodations.rejected, onError);

    builder.addCase(AsyncThunks.deleteAccommodation.pending, onPending);
    builder.addCase(AsyncThunks.deleteAccommodation.fulfilled, (state, action) => {
      state.pending = false;

      const accommodationId = action.payload;
      state.result = state.result?.filter((acc) => acc.id !== accommodationId);
    });
    builder.addCase(AsyncThunks.deleteAccommodation.rejected, onError);
  },
});

export const accommodationsListActions = accommodationsListSlice.actions;
export const accommodationsListReducer = accommodationsListSlice.reducer;

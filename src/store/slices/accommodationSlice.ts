import { createSlice } from '@reduxjs/toolkit';
import { Accommodation, AccommodationFullView, StateType } from 'src/types';

import { onError, onPending } from '../stateResults';
import { AsyncThunks } from '../thunks';

type AccommodationStateType = StateType<Accommodation | AccommodationFullView>;

const initialState: AccommodationStateType = {
  error: null,
  pending: false,
  result: null,
};

const accommodationSlice = createSlice({
  name: 'accommodation',
  initialState,
  reducers: {
    reset: () => initialState,

    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(AsyncThunks.getAccommodation.pending, onPending);
    builder.addCase(AsyncThunks.getAccommodation.fulfilled, (state, action) => {
      state.pending = false;
      state.result = action.payload.data;
    });
    builder.addCase(AsyncThunks.getAccommodation.rejected, onError);

    builder.addCase(AsyncThunks.addAccommodationImage.pending, onPending);
    builder.addCase(AsyncThunks.addAccommodationImage.fulfilled, (state, action) => {
      state.pending = false;
      state.result = action.payload.data;
    });
    builder.addCase(AsyncThunks.addAccommodationImage.rejected, onError);
  },
});

export const accommodationActions = accommodationSlice.actions;
export const accommodationReducer = accommodationSlice.reducer;

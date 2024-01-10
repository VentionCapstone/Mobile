import { createSlice } from '@reduxjs/toolkit';
import { Accommodation, StateType } from 'src/types';

import { onError, onPending } from '../stateResults';
import { AsyncThunks } from '../thunks';

type MyAccommodationsStateType = StateType<Accommodation[]>;

const initialState: MyAccommodationsStateType = {
  error: null,
  pending: false,
  result: null,
};

const myAccommodationsListSlice = createSlice({
  name: 'myAccommodationsList',
  initialState,
  reducers: {
    reset: () => initialState,

    clearError: (state) => {
      state.error = null;
    },

    createAccommodation: (state, action) => {
      const createAccommodation = action.payload.data;
      state.result = state.result || [];

      state.result.push(createAccommodation);
    },

    updateAccommodation: (state, action) => {
      const updatedAccommodation = action.payload.data;

      const accommodationToUpdate = state.result?.findIndex(
        (acc) => acc.id === updatedAccommodation.id
      );

      if (accommodationToUpdate !== undefined && accommodationToUpdate !== -1) {
        state.result![accommodationToUpdate] = updatedAccommodation;
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(AsyncThunks.getMyAccommodations.pending, onPending);
    builder.addCase(AsyncThunks.getMyAccommodations.fulfilled, (state, action) => {
      state.pending = false;
      state.result = action.payload.data;
    });
    builder.addCase(AsyncThunks.getMyAccommodations.rejected, onError);

    builder.addCase(AsyncThunks.createAccommodation.pending, onPending);
    builder.addCase(AsyncThunks.createAccommodation.fulfilled, (state, action) => {
      state.pending = false;

      myAccommodationsListSlice.caseReducers.createAccommodation(state, action);
    });
    builder.addCase(AsyncThunks.createAccommodation.rejected, onError);

    builder.addCase(AsyncThunks.updateAccommodation.pending, onPending);
    builder.addCase(AsyncThunks.updateAccommodation.fulfilled, (state, action) => {
      state.pending = false;
      myAccommodationsListSlice.caseReducers.updateAccommodation(state, action);
    });
    builder.addCase(AsyncThunks.updateAccommodation.rejected, onError);

    builder.addCase(AsyncThunks.deleteAccommodation.pending, onPending);
    builder.addCase(AsyncThunks.deleteAccommodation.fulfilled, (state, action) => {
      state.pending = false;
      const accommodationId = action.payload;
      state.result = state.result?.filter((acc) => acc.id !== accommodationId);
    });
    builder.addCase(AsyncThunks.deleteAccommodation.rejected, onError);
  },
});

export const myAccommodationsListActions = myAccommodationsListSlice.actions;
export const myAccommodationsListReducer = myAccommodationsListSlice.reducer;

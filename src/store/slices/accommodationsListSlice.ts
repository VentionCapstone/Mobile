import { createSlice } from '@reduxjs/toolkit';
import { AccommodationsListResponse, StateType } from 'src/types';

import { onError, onPending } from '../stateResults';
import { AsyncThunks } from '../thunks';

type AccommodationListStateType = StateType<AccommodationsListResponse>;

const initialState: AccommodationListStateType = {
  error: null,
  pending: false,
  result: null,
};

const accommodationListSlice = createSlice({
  name: 'accommodationList',
  initialState,
  reducers: {
    reset: () => initialState,
    clearError: (state) => {
      state.error = null;
    },
    // setFilter: (state, action) => {
    //   state.filters = action.payload;
    // },
    // resetFilters: (state) => {
    //   state.filters = initialState.filters;
    // },
  },
  extraReducers: (builder) => {
    builder.addCase(AsyncThunks.getListOfAccommodations.pending, onPending);
    builder.addCase(AsyncThunks.getListOfAccommodations.fulfilled, (state, action) => {
      state.pending = false;

      if (action.meta.arg.page === 1) {
        state.result = action.payload;
      } else {
        const prevListData = state.result?.data;

        state.result = action.payload;
        if (prevListData) {
          state.result.data = [...prevListData, ...action.payload.data];
        }
      }
    });
    builder.addCase(AsyncThunks.getListOfAccommodations.rejected, onError);
  },
});

export const accommodationListActions = accommodationListSlice.actions;
export const accommodationListReducer = accommodationListSlice.reducer;

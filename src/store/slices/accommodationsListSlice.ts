import { createSlice } from '@reduxjs/toolkit';
import { ExploreListItem, ListingSearchValues, StateType } from 'src/types';

import { onError, onPending } from '../stateResults';
import { AsyncThunks } from '../thunks';

interface AccommodationListStateType extends StateType<ExploreListItem[]> {
  filters: ListingSearchValues;
}

const initialState: AccommodationListStateType = {
  error: null,
  pending: false,
  result: null,
  filters: {} as ListingSearchValues,
};

const accommodationListSlice = createSlice({
  name: 'accommodationList',
  initialState,
  reducers: {
    reset: () => initialState,

    clearError: (state) => {
      state.error = null;
    },

    setFilter: (state, action) => {
      state.filters = action.payload;
    },
    resetFilters: (state) => {
      state.filters = initialState.filters;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(AsyncThunks.getListOfAccommodations.pending, onPending);
    builder.addCase(AsyncThunks.getListOfAccommodations.fulfilled, (state, action) => {
      state.pending = false;
      state.result = action.payload.data;
    });
    builder.addCase(AsyncThunks.getListOfAccommodations.rejected, onError);
  },
});

export const accommodationListActions = accommodationListSlice.actions;
export const accommodationListReducer = accommodationListSlice.reducer;

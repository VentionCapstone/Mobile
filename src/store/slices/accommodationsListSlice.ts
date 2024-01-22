import { createSlice } from '@reduxjs/toolkit';
import { DEFAULT_FILTER_VALUES } from 'src/constants/defaultSearchVelues';
import { ExploreListItem, SearchValues, StateType } from 'src/types';

import { onError, onPending } from '../stateResults';
import { AsyncThunks } from '../thunks';

interface AccommodationListStateType extends StateType<ExploreListItem[]> {
  filters: SearchValues;
}

const initialState: AccommodationListStateType = {
  error: null,
  pending: false,
  result: null,
  filters: DEFAULT_FILTER_VALUES,
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
    builder.addCase(AsyncThunks.getUpdatedListOfAccommodations.pending, onPending);
    builder.addCase(AsyncThunks.getUpdatedListOfAccommodations.fulfilled, (state, action) => {
      state.pending = false;
      state.result = state.result ? [...state.result, ...action.payload.data] : action.payload.data;
    });
    builder.addCase(AsyncThunks.getUpdatedListOfAccommodations.rejected, onError);
  },
});

export const accommodationListActions = accommodationListSlice.actions;
export const accommodationListReducer = accommodationListSlice.reducer;

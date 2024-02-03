import { createSlice } from '@reduxjs/toolkit';
import { HostProfile, StateType } from 'src/types';

import { onError, onPending } from '../stateResults';
import { AsyncThunks } from '../thunks';

type HostProfileStateType = StateType<HostProfile>;

const initialState: HostProfileStateType = {
  error: null,
  pending: false,
  result: null,
};

const hostProfileSlice = createSlice({
  name: 'hostProfile',
  initialState,
  reducers: {
    reset: () => initialState,

    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(AsyncThunks.getHostProfile.pending, onPending);
    builder.addCase(AsyncThunks.getHostProfile.fulfilled, (state, action) => {
      state.pending = false;
      state.result = action.payload.data;
    });
    builder.addCase(AsyncThunks.getHostProfile.rejected, onError);
  },
});

// export const hostProfileActions = hostProfileSlice.actions;
export const hostProfileReducer = hostProfileSlice.reducer;

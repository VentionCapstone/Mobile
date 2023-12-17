import { createSlice } from '@reduxjs/toolkit';
import { StateType, User } from 'src/types';

import { onError, onPending } from '../stateResults';
import { AsyncThunks } from '../thunks';

type UserStateType = StateType<User>;

const initialState: UserStateType = {
  error: null,
  pending: false,
  result: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    reset: () => initialState,

    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(AsyncThunks.getUserDetails.pending, onPending);
    builder.addCase(AsyncThunks.getUserDetails.fulfilled, (state, action) => {
      state.pending = false;
      state.result = action.payload.data;
    });
    builder.addCase(AsyncThunks.getUserDetails.rejected, onError);
  },
});

export const userActions = userSlice.actions;
export const userReducer = userSlice.reducer;

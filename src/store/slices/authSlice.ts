import { createSlice } from '@reduxjs/toolkit';
import { AuthState } from 'src/types';

import { AsyncThunks } from '../thunks';

const initialState: AuthState = {
  id: '',
  accessToken: null,
  refreshToken: null,
  pending: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Sign in reducers
    builder.addCase(AsyncThunks.signIn.pending, (state) => {
      state.pending = true;
    });
    builder.addCase(AsyncThunks.signIn.fulfilled, (state, action) => {
      state.pending = false;
      state.id = action.payload.id;
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
    });
    builder.addCase(AsyncThunks.signIn.rejected, (state, action) => {
      state.error = action.payload;
      state.pending = false;
    });
    //Sign up reducers
    builder.addCase(AsyncThunks.signUp.pending, (state) => {
      state.pending = true;
    });
    builder.addCase(AsyncThunks.signUp.fulfilled, (state) => {
      state.pending = false;
    });
    builder.addCase(AsyncThunks.signUp.rejected, (state, action) => {
      state.error = action.payload;
      state.pending = false;
    });
    //Sign Out reducers
    builder.addCase(AsyncThunks.signOut.pending, (state) => {
      state.pending = true;
    });
    builder.addCase(AsyncThunks.signOut.fulfilled, (state, action) => {
      state.pending = false;
      state.id = '';
      state.accessToken = '';
      state.refreshToken = '';
    });
    builder.addCase(AsyncThunks.signOut.rejected, (state, action) => {
      state.error = action.payload;
      state.pending = false;
    });
  },
});

export const authActions = authSlice.actions;
export const authReducer = authSlice.reducer;

import AsyncStorage from '@react-native-async-storage/async-storage';
import { createSlice } from '@reduxjs/toolkit';
import { AuthState } from 'src/types';

import { AsyncThunks } from '../thunks';

const initialState: AuthState = {
  id: '',
  tokens: null,
  pending: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    reset: () => initialState,
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Sign in reducers
    builder.addCase(AsyncThunks.signIn.pending, (state) => {
      state.pending = true;
    });
    builder.addCase(AsyncThunks.signIn.fulfilled, (state, action) => {
      state.pending = false;
      state.id = action.payload.id;
      AsyncStorage.setItem('tokens', JSON.stringify(action.payload.tokens));
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
      AsyncStorage.removeItem('tokens');
    });
    builder.addCase(AsyncThunks.signOut.rejected, (state, action) => {
      state.error = action.payload;
      state.pending = false;
    });
  },
});

export const authActions = authSlice.actions;
export const authReducer = authSlice.reducer;

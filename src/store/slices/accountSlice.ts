import { createSlice } from '@reduxjs/toolkit';
import { onError, onPending } from 'src/store/stateResults';
import { Account, StateType } from 'src/types';

import { AsyncThunks } from '../thunks';

type AccountStateType = StateType<Account> & {
  user_id: string | null;
  isLoggedIn: boolean;
  isGuest: boolean;
};

const initialState: AccountStateType = {
  error: null,
  pending: false,
  result: null,
  user_id: null,
  isLoggedIn: false,
  isGuest: true,
};

const accountSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {
    reset: () => initialState,
    clearError: (state) => {
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(AsyncThunks.createAccount.pending, onPending);
    builder.addCase(AsyncThunks.createAccount.fulfilled, (state, action) => {
      state.pending = false;
      state.isGuest = false;
    });
    builder.addCase(AsyncThunks.createAccount.rejected, onError);

    builder.addCase(AsyncThunks.updateAccount.pending, onPending);
    builder.addCase(AsyncThunks.updateAccount.fulfilled, (state, action) => {
      state.pending = false;
    });
    builder.addCase(AsyncThunks.updateAccount.rejected, onError);
    // Sign In reducers
    builder.addCase(AsyncThunks.signIn.pending, onPending);
    builder.addCase(AsyncThunks.signIn.fulfilled, (state, action) => {
      state.pending = false;
      state.user_id = action.payload.user_id;
      state.isLoggedIn = true;
      state.isGuest = false;
    });
    builder.addCase(AsyncThunks.signIn.rejected, onError);
    //Sign Up reducers
    builder.addCase(AsyncThunks.signUp.pending, onPending);
    builder.addCase(AsyncThunks.signUp.fulfilled, (state, action) => {
      state.pending = false;
      state.result = action.payload;
    });
    builder.addCase(AsyncThunks.signUp.rejected, onError);
    // Verification reducers
    builder.addCase(AsyncThunks.verifyEmail.pending, onPending);
    builder.addCase(AsyncThunks.verifyEmail.fulfilled, (state, action) => {
      state.pending = false;
      state.result = action.payload;
    });
    builder.addCase(AsyncThunks.verifyEmail.rejected, onError);
    //Sign Out reducers
    builder.addCase(AsyncThunks.signOut.pending, onPending);
    builder.addCase(AsyncThunks.signOut.fulfilled, (state, action) => {
      state.result = action.payload;
      state.pending = false;
      state.user_id = null;
      state.isLoggedIn = false;
      state.isGuest = true;
    });
    builder.addCase(AsyncThunks.signOut.rejected, onError);
  },
});

export const accountActions = accountSlice.actions;
export const accountReducer = accountSlice.reducer;

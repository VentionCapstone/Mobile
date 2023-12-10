import { createSlice } from '@reduxjs/toolkit';
import { user } from 'src/data/mockData';
import { onError, onPending } from 'src/store/stateResults';
import { Account, StateType } from 'src/types';

import { AsyncThunks } from '../thunks';

type AccountStateType = StateType<Account> & {
  isLoggedIn: boolean;
  isGuest: boolean;
};

const initialState: AccountStateType = {
  error: null,
  pending: false,
  result: null,
  isLoggedIn: true,
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
  },
});

export const accountActions = accountSlice.actions;
export const accountReducer = accountSlice.reducer;

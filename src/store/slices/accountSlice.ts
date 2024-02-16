import { createSlice } from '@reduxjs/toolkit';
import { ProfileResponseType, StateType } from 'src/types';

import { onError, onPending } from '../stateResults';
import { AsyncThunks } from '../thunks';

type AccountStateType = StateType<ProfileResponseType> & {
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
      state.result = action.payload;
      state.isGuest = false;
      state.pending = false;
    });
    builder.addCase(AsyncThunks.createAccount.rejected, onError);

    builder.addCase(AsyncThunks.updateAccount.pending, onPending);
    builder.addCase(AsyncThunks.updateAccount.fulfilled, (state, action) => {
      state.result = action.payload;
      state.pending = false;
    });
    builder.addCase(AsyncThunks.updateAccount.rejected, onError);

    builder.addCase(AsyncThunks.addProfileImage.pending, onPending);
    builder.addCase(AsyncThunks.addProfileImage.fulfilled, (state, action) => {
      state.result = action.payload;
      state.pending = false;
    });
    builder.addCase(AsyncThunks.addProfileImage.rejected, onError);

    builder.addCase(AsyncThunks.getAccountDetails.pending, onPending);
    builder.addCase(AsyncThunks.getAccountDetails.fulfilled, (state, action) => {
      state.result = action.payload.data;
      state.isGuest = false;
      state.pending = false;
    });
    builder.addCase(AsyncThunks.getAccountDetails.rejected, onError);

    builder.addCase(AsyncThunks.signIn.pending, onPending);
    builder.addCase(AsyncThunks.signIn.fulfilled, (state, action) => {
      state.user_id = action.payload.id;
      state.isLoggedIn = true;
      state.pending = false;
    });
    builder.addCase(AsyncThunks.signIn.rejected, onError);

    builder.addCase(AsyncThunks.signUp.pending, onPending);
    builder.addCase(AsyncThunks.signUp.fulfilled, (state, action) => {
      state.pending = false;
    });
    builder.addCase(AsyncThunks.signUp.rejected, onError);

    builder.addCase(AsyncThunks.signOut.pending, onPending);
    builder.addCase(AsyncThunks.signOut.fulfilled, (state, action) => {
      state.isLoggedIn = false;
      state.user_id = null;
      state.isGuest = true;
      state.pending = false;
    });
    builder.addCase(AsyncThunks.signOut.rejected, onError);
  },
});

export const accountActions = accountSlice.actions;
export const accountReducer = accountSlice.reducer;

import { createSlice } from '@reduxjs/toolkit';
import { ProfileResponseType, StateType } from 'src/types';

import { onError, onPending } from '../stateResults';
import { AsyncThunks } from '../thunks';

type AccountStateType = StateType<ProfileResponseType | any> & {
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

    builder.addCase(AsyncThunks.addProfileImage.pending, onPending);
    builder.addCase(AsyncThunks.addProfileImage.fulfilled, (state, action) => {
      state.pending = false;
      state.result = action.payload;
    });
    builder.addCase(AsyncThunks.addProfileImage.rejected, onError);

    builder.addCase(AsyncThunks.getAccountDetails.pending, onPending);
    builder.addCase(AsyncThunks.getAccountDetails.fulfilled, (state, action) => {
      state.pending = false;
      state.isGuest = false;
      state.result = action.payload.data;
    });
    builder.addCase(AsyncThunks.getAccountDetails.rejected, onError);

    builder.addCase(AsyncThunks.signIn.pending, onPending);
    builder.addCase(AsyncThunks.signIn.fulfilled, (state, action) => {
      state.pending = false;
      state.isLoggedIn = true;
      state.user_id = action.payload.id;
    });
    builder.addCase(AsyncThunks.signIn.rejected, onError);

    builder.addCase(AsyncThunks.signUp.pending, onPending);
    builder.addCase(AsyncThunks.signUp.fulfilled, (state, action) => {
      state.pending = false;
    });
    builder.addCase(AsyncThunks.signUp.rejected, onError);

    builder.addCase(AsyncThunks.signOut.pending, onPending);
    builder.addCase(AsyncThunks.signOut.fulfilled, (state, action) => {
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

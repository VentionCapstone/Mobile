import { createSlice } from '@reduxjs/toolkit';
import { StateType } from 'src/api/types';
import { user } from 'src/data/mockData';
import { ProfileFormValues } from 'src/types';

import { AsyncThunks } from '../../actions';
import { onError, onPending } from '../../stateResults';

type InitialProps = StateType & {
  result: ProfileFormValues | null;
  isProfileCreated: boolean;
};

const initialState: InitialProps = {
  error: null,
  pending: false,
  result: user,
  isProfileCreated: false,
};

const SLICE_NAME = 'user';

const userSlice = createSlice({
  name: SLICE_NAME,
  initialState,
  reducers: {
    reset: () => initialState,

    clearError: (state) => {
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(AsyncThunks.createProfile.pending, onPending);
    builder.addCase(AsyncThunks.createProfile.fulfilled, (state, action) => {
      state.pending = false;
      state.isProfileCreated = true;
    });
    builder.addCase(AsyncThunks.createProfile.rejected, onError);

    builder.addCase(AsyncThunks.updateProfile.pending, onPending);
    builder.addCase(AsyncThunks.updateProfile.fulfilled, (state, action) => {
      state.pending = false;
    });
    builder.addCase(AsyncThunks.updateProfile.rejected, onError);
  },
});

export const userActions = userSlice.actions;
export default userSlice.reducer;

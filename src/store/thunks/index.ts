import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  refreshTokensThunk,
  signInThunk,
  signOutThunk,
  signUpThunk,
} from 'src/store/thunks/authThunk';

import { createAccountThunk, updateAccountThunk } from './accountThunk';

export const AsyncThunks = {
  createAccount: createAsyncThunk('createAccountThunk', createAccountThunk),
  updateAccount: createAsyncThunk('updateAccountThunk', updateAccountThunk),
  signIn: signInThunk,
  signOut: signOutThunk,
  signUp: signUpThunk,
  refresh: refreshTokensThunk,
};

import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  refreshThunk,
  signInThunk,
  signOutThunk,
  signUpThunk,
  verifyEmailThunk,
} from 'src/store/thunks/authThunk';

import { createAccountThunk, updateAccountThunk } from './accountThunk';

export const AsyncThunks = {
  createAccount: createAsyncThunk('createAccountThunk', createAccountThunk),
  updateAccount: createAsyncThunk('updateAccountThunk', updateAccountThunk),
  signIn: createAsyncThunk('signInThunk', signInThunk),
  signOut: createAsyncThunk('signOutThunk', signOutThunk),
  signUp: createAsyncThunk('signUpThunk', signUpThunk),
  refresh: createAsyncThunk('refreshThunk', refreshThunk),
  verifyEmail: createAsyncThunk('verifyEmailThunk', verifyEmailThunk),
};

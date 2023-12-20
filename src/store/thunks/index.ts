import { createAsyncThunk } from '@reduxjs/toolkit';
import { signInThunk, signOutThunk, signUpThunk } from 'src/store/thunks/authThunk';

import {
  createAccommodationThunk,
  deleteAccommodationThunk,
  updateAccommodationThunk,
  addAccommodationImageThunk,
  getAccommodationThunk,
  getMyAccommodationsThunk,
} from './accommodationThunk';
import { createAccountThunk, getAccountDetailsThunk, updateAccountThunk } from './accountThunk';
import { getUserDetailsThunk } from './userThunk';

export const AsyncThunks = {
  signUp: createAsyncThunk('signUpThunk', signUpThunk),
  signIn: createAsyncThunk('signInThunk', signInThunk),
  signOut: createAsyncThunk('signOutThunk', signOutThunk),

  createAccount: createAsyncThunk('createAccountThunk', createAccountThunk),
  updateAccount: createAsyncThunk('updateAccountThunk', updateAccountThunk),
  getAccountDetails: createAsyncThunk('getAccountDetailsThunk', getAccountDetailsThunk),

  createAccommodation: createAsyncThunk('createAccommodationThunk', createAccommodationThunk),
  updateAccommodation: createAsyncThunk('updateAccommodationThunk', updateAccommodationThunk),
  deleteAccommodation: createAsyncThunk('deleteAccommodationThunk', deleteAccommodationThunk),
  addAccommodationImage: createAsyncThunk('AddAccommodationImageThunk', addAccommodationImageThunk),
  getAccommodation: createAsyncThunk('getAccommodationThunk', getAccommodationThunk),
  getMyAccommodations: createAsyncThunk('getAccommodationsThunk', getMyAccommodationsThunk),

  getUserDetails: createAsyncThunk('getUserDetailsThunk', getUserDetailsThunk),
};

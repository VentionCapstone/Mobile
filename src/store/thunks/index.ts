import { createAsyncThunk } from '@reduxjs/toolkit';

import {
  createAccommodationThunk,
  deleteAccommodationThunk,
  updateAccommodationThunk,
} from './accommodationThunk';
import { createAccountThunk, updateAccountThunk } from './accountThunk';

export const AsyncThunks = {
  createAccount: createAsyncThunk('createAccountThunk', createAccountThunk),
  updateAccount: createAsyncThunk('updateAccountThunk', updateAccountThunk),

  createAccommodation: createAsyncThunk('createAccommodationThunk', createAccommodationThunk),
  updateAccommodation: createAsyncThunk('updateAccommodationThunk', updateAccommodationThunk),
  deleteAccommodation: createAsyncThunk('deleteAccommodationThunk', deleteAccommodationThunk),
};

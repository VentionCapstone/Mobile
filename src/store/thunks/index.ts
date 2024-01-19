import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  signInThunk,
  signOutThunk,
  signUpThunk,
  verifyEmailThunk,
} from 'src/store/thunks/authThunk';

import {
  createAccommodationThunk,
  deleteAccommodationThunk,
  updateAccommodationThunk,
  addAccommodationImageThunk,
  getAccommodationThunk,
  getMyAccommodationsThunk,
} from './accommodationThunk';
import { getListOfAccommodationsThunk } from './accomodationListThunk';
import { createAccountThunk, getAccountDetailsThunk, updateAccountThunk } from './accountThunk';
import {
  addAmenitiesThunk,
  deleteAmenitiesThunk,
  getAmenitiesListThunk,
  getAmenitiesThunk,
  updateAmenitiesThunk,
} from './amenitiesThunk';
import { getUserDetailsThunk } from './userThunk';

export const AsyncThunks = {
  signUp: createAsyncThunk('signUpThunk', signUpThunk),
  signIn: createAsyncThunk('signInThunk', signInThunk),
  signOut: createAsyncThunk('signOutThunk', signOutThunk),
  verifyEmail: createAsyncThunk('verifyEmailThunk', verifyEmailThunk),

  createAccount: createAsyncThunk('createAccountThunk', createAccountThunk),
  updateAccount: createAsyncThunk('updateAccountThunk', updateAccountThunk),
  getAccountDetails: createAsyncThunk('getAccountDetailsThunk', getAccountDetailsThunk),
  getUserDetails: createAsyncThunk('getUserDetailsThunk', getUserDetailsThunk),

  createAccommodation: createAsyncThunk('createAccommodationThunk', createAccommodationThunk),
  updateAccommodation: createAsyncThunk('updateAccommodationThunk', updateAccommodationThunk),
  deleteAccommodation: createAsyncThunk('deleteAccommodationThunk', deleteAccommodationThunk),
  addAccommodationImage: createAsyncThunk('AddAccommodationImageThunk', addAccommodationImageThunk),
  getAccommodation: createAsyncThunk('getAccommodationThunk', getAccommodationThunk),
  getMyAccommodations: createAsyncThunk('getAccommodationsThunk', getMyAccommodationsThunk),
  getListOfAccommodations: createAsyncThunk(
    'getListOfAccommodationsThunk',
    getListOfAccommodationsThunk
  ),

  getAmenitiesListThunk: createAsyncThunk('getAmenitiesListThunk', getAmenitiesListThunk),
  getAmenitiesThunk: createAsyncThunk('getAmenitiesThunk', getAmenitiesThunk),
  updateAmenitiesThunk: createAsyncThunk('updateAmenitiesThunk', updateAmenitiesThunk),
  addAmenitiesThunk: createAsyncThunk('addAmenitiesThunk', addAmenitiesThunk),
  deleteAmenitiesThunk: createAsyncThunk('deleteAmenitiesThunk', deleteAmenitiesThunk),
};

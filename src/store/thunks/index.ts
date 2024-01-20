import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  refreshThunk,
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
import { createAccountThunk, getAccountDetailsThunk, updateAccountThunk } from './accountThunk';
import { getUserDetailsThunk } from './userThunk';
import { addToWishlistThunk, removeFromWishlistThunk, getWishlistsThunk } from './wishlistThunk';

export const AsyncThunks = {
  signUp: createAsyncThunk('signUpThunk', signUpThunk),
  signIn: createAsyncThunk('signInThunk', signInThunk),
  signOut: createAsyncThunk('signOutThunk', signOutThunk),
  refresh: createAsyncThunk('refreshThunk', refreshThunk),
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

  getWishlists: createAsyncThunk('getWishlistsThunk', getWishlistsThunk),
  addToWishlist: createAsyncThunk('addToWishlistThunk', addToWishlistThunk),
  removeFromWishlist: createAsyncThunk('removeFromWishlistThunk', removeFromWishlistThunk),
};

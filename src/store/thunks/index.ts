import { createAsyncThunk } from '@reduxjs/toolkit';

import {
  createAccommodationThunk,
  deleteAccommodationThunk,
  updateAccommodationThunk,
  uploadAccommodationImagesThunk,
  getAccommodationThunk,
  getMyAccommodationsThunk,
} from './accommodationThunk';
import { getListOfAccommodationsThunk } from './accomodationListThunk';
import {
  addProfileImageThunk,
  createAccountThunk,
  getAccountDetailsThunk,
  updateAccountThunk,
} from './accountThunk';
import {
  addAmenitiesThunk,
  deleteAmenitiesThunk,
  getAmenitiesListThunk,
  getAmenitiesThunk,
  updateAmenitiesThunk,
} from './amenitiesThunk';
import { signInThunk, signOutThunk, signUpThunk } from './authThunk';
import { getUserDetailsThunk } from './userThunk';
import { addToWishlistThunk, removeFromWishlistThunk, getWishlistsThunk } from './wishlistThunk';

export const AsyncThunks = {
  signUp: createAsyncThunk('signUpThunk', signUpThunk),
  signIn: createAsyncThunk('signInThunk', signInThunk),
  signOut: createAsyncThunk('signOutThunk', signOutThunk),

  createAccount: createAsyncThunk('createAccountThunk', createAccountThunk),
  updateAccount: createAsyncThunk('updateAccountThunk', updateAccountThunk),
  getAccountDetails: createAsyncThunk('getAccountDetailsThunk', getAccountDetailsThunk),
  getUserDetails: createAsyncThunk('getUserDetailsThunk', getUserDetailsThunk),
  addProfileImage: createAsyncThunk('addProfileImageThunk', addProfileImageThunk),

  createAccommodation: createAsyncThunk('createAccommodationThunk', createAccommodationThunk),
  updateAccommodation: createAsyncThunk('updateAccommodationThunk', updateAccommodationThunk),
  deleteAccommodation: createAsyncThunk('deleteAccommodationThunk', deleteAccommodationThunk),
  uploadAccommodationImages: createAsyncThunk(
    'uploadAccommodationImagesThunk',
    uploadAccommodationImagesThunk
  ),
  getAccommodation: createAsyncThunk('getAccommodationThunk', getAccommodationThunk),
  getMyAccommodations: createAsyncThunk('getAccommodationsThunk', getMyAccommodationsThunk),
  getListOfAccommodations: createAsyncThunk(
    'getListOfAccommodationsThunk',
    getListOfAccommodationsThunk
  ),

  getWishlists: createAsyncThunk('getWishlistsThunk', getWishlistsThunk),
  addToWishlist: createAsyncThunk('addToWishlistThunk', addToWishlistThunk),
  removeFromWishlist: createAsyncThunk('removeFromWishlistThunk', removeFromWishlistThunk),

  getAmenitiesListThunk: createAsyncThunk('getAmenitiesListThunk', getAmenitiesListThunk),
  getAmenitiesThunk: createAsyncThunk('getAmenitiesThunk', getAmenitiesThunk),
  updateAmenitiesThunk: createAsyncThunk('updateAmenitiesThunk', updateAmenitiesThunk),
  addAmenitiesThunk: createAsyncThunk('addAmenitiesThunk', addAmenitiesThunk),
  deleteAmenitiesThunk: createAsyncThunk('deleteAmenitiesThunk', deleteAmenitiesThunk),
};

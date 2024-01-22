import { createSlice } from '@reduxjs/toolkit';
import { StateType, Wishlist } from 'src/types';

import { onError, onPending } from '../stateResults';
import { AsyncThunks } from '../thunks';

type WishlistStateType = StateType<Wishlist[]>;

const initialState: WishlistStateType = {
  error: null,
  pending: false,
  result: null,
};

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    reset: () => initialState,

    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(AsyncThunks.getWishlists.pending, onPending);
    builder.addCase(AsyncThunks.getWishlists.fulfilled, (state, action) => {
      state.pending = false;
      state.result = action.payload.data;
    });
    builder.addCase(AsyncThunks.getWishlists.rejected, onError);

    builder.addCase(AsyncThunks.addToWishlist.pending, onPending);
    builder.addCase(AsyncThunks.addToWishlist.fulfilled, (state) => {
      state.pending = false;
    });
    builder.addCase(AsyncThunks.addToWishlist.rejected, onError);

    builder.addCase(AsyncThunks.removeFromWishlist.pending, onPending);
    builder.addCase(AsyncThunks.removeFromWishlist.fulfilled, (state, action) => {
      state.pending = false;
      const wishlistId = action.payload;

      state.result = state.result?.filter((wishlist) => wishlist.id !== wishlistId);
    });
    builder.addCase(AsyncThunks.removeFromWishlist.rejected, onError);
  },
});

export const wishlistActions = wishlistSlice.actions;
export const wishlistReducer = wishlistSlice.reducer;

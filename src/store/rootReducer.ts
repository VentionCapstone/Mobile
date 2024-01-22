import { combineReducers } from '@reduxjs/toolkit';

import {
  accommodationReducer,
  accountReducer,
  myAccommodationsListReducer,
  themeReducer,
  userReducer,
  wishlistReducer,
} from './slices';

const rootReducer = combineReducers({
  account: accountReducer,
  theme: themeReducer,
  accommodation: accommodationReducer,
  myAccommodationsList: myAccommodationsListReducer,
  user: userReducer,
  wishlist: wishlistReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;

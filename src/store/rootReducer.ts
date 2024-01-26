import { combineReducers } from '@reduxjs/toolkit';

import {
  accommodationListReducer,
  accommodationReducer,
  accountReducer,
  languageReducer,
  myAccommodationsListReducer,
  themeReducer,
  userReducer,
  wishlistReducer,
} from './slices';

const rootReducer = combineReducers({
  accommodationList: accommodationListReducer,
  accommodation: accommodationReducer,
  account: accountReducer,
  language: languageReducer,
  myAccommodationsList: myAccommodationsListReducer,
  theme: themeReducer,
  user: userReducer,
  wishlist: wishlistReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;

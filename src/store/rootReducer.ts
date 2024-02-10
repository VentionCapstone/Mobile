import { combineReducers } from '@reduxjs/toolkit';

import {
  accommodationListReducer,
  accommodationReducer,
  accountReducer,
  amenitiesReducer,
  languageReducer,
  myAccommodationsListReducer,
  themeReducer,
  userReducer,
  wishlistReducer,
} from './slices';
import { hostProfileReducer } from './slices/hostProfileSlice';

const rootReducer = combineReducers({
  account: accountReducer,
  theme: themeReducer,
  accommodation: accommodationReducer,
  myAccommodationsList: myAccommodationsListReducer,
  accommodationList: accommodationListReducer,
  user: userReducer,
  wishlist: wishlistReducer,
  amenities: amenitiesReducer,
  hostProfile: hostProfileReducer,
  language: languageReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;

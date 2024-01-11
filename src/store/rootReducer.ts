import { combineReducers } from '@reduxjs/toolkit';

import {
  accommodationReducer,
  accountReducer,
  myAccommodationsListReducer,
  themeReducer,
  userReducer,
} from './slices';

const rootReducer = combineReducers({
  account: accountReducer,
  theme: themeReducer,
  accommodation: accommodationReducer,
  myAccommodationsList: myAccommodationsListReducer,
  user: userReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;

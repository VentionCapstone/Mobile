import { combineReducers } from '@reduxjs/toolkit';

import {
  accommodationListReducer,
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
  accommodationList: accommodationListReducer,
  user: userReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;

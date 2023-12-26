import { combineReducers } from '@reduxjs/toolkit';

import { accommodationReducer, accountReducer, themeReducer, userReducer } from './slices';
import { accommodationsListReducer } from './slices/accommodationsListSlice';

const rootReducer = combineReducers({
  account: accountReducer,
  theme: themeReducer,
  accommodation: accommodationReducer,
  accommodationsList: accommodationsListReducer,
  user: userReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;

import { combineReducers } from '@reduxjs/toolkit';

import { accommodationReducer, accountReducer, themeReducer } from './slices';

const rootReducer = combineReducers({
  account: accountReducer,
  theme: themeReducer,
  accommodation: accommodationReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;

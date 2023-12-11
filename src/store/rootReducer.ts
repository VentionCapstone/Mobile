import { combineReducers } from '@reduxjs/toolkit';

import { accountReducer, themeReducer } from './slices';

const rootReducer = combineReducers({
  account: accountReducer,
  theme: themeReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;

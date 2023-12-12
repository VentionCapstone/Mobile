import { combineReducers } from '@reduxjs/toolkit';

import { accountReducer, themeReducer, authReducer } from './slices';

const rootReducer = combineReducers({
  auth: authReducer,
  account: accountReducer,
  theme: themeReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;

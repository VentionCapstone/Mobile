import { createAsyncThunk } from '@reduxjs/toolkit';

import { createAccountThunk, updateAccountThunk } from './accountThunk';

export const AsyncThunks = {
  createAccount: createAsyncThunk('createAccountThunk', createAccountThunk),
  updateAccount: createAsyncThunk('updateAccountThunk', updateAccountThunk),
};

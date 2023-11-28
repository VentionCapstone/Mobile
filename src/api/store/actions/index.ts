import { createAsyncThunk } from '@reduxjs/toolkit';

import { createProfileThunk, updateProfileThunk } from './thunks/userThunk';

export const AsyncThunks = {
  createProfile: createAsyncThunk('createProfileThunk', createProfileThunk),
  updateProfile: createAsyncThunk('updateProfileThunk', updateProfileThunk),
};

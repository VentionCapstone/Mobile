// authReducer.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthState } from 'src/types';

const initialState: AuthState = {
  userId: '',
  accessToken: null,
  refreshToken: null,
  loading: 'idle',
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setTokens: (
      state,
      action: PayloadAction<{ userId: string; accessToken: string; refreshToken: string }>
    ) => {
      state.userId = action.payload.userId;
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
    },
    setLoading: (state, action: PayloadAction<'idle' | 'pending' | 'succeeded' | 'failed'>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    logout: (state) => {
      state.userId = '';
      state.accessToken = null;
      state.refreshToken = null;
    },
  },
});

export const { setTokens, setLoading, setError, logout } = authSlice.actions;
export const authReducer = authSlice.reducer;

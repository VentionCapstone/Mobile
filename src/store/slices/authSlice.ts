import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthState, ErrorResponseType } from 'src/types';

const initialState: AuthState = {
  id: '',
  accessToken: null,
  refreshToken: null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setTokens: (
      state,
      action: PayloadAction<{ id: string; accessToken: string; refreshToken: string }>
    ) => {
      state.id = action.payload.id;
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<ErrorResponseType | undefined | null>) => {
      state.error = action.payload;
    },
    logout: (state) => {
      state.id = '';
      state.accessToken = null;
      state.refreshToken = null;
    },
  },
});

export const { setTokens, setLoading, setError, logout } = authSlice.actions;
export const authReducer = authSlice.reducer;

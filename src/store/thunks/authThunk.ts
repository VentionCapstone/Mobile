import AsyncStorage from '@react-native-async-storage/async-storage';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { ENDPOINTS, axiosInstance } from 'src/axios';
import { RootState } from 'src/store';
import { setTokens, setLoading, setError, logout } from 'src/store/slices/authSlice';
import { AuthState, LoginCredentials, SignUpCredentials } from 'src/types';

export const signUpThunk = createAsyncThunk(
  'auth/signup',
  async (credentials: SignUpCredentials, { dispatch }) => {
    try {
      dispatch(setLoading(false));
      const response = await axiosInstance.post(ENDPOINTS.auth.signup, credentials);
      if (response.status === 201) {
        dispatch(setLoading(false));
      }
    } catch (error) {
      console.log(error);
      dispatch(setError({ message: 'Sign up failed' }));
      dispatch(setLoading(false));
    }
  }
);

export const signInThunk = createAsyncThunk(
  'auth/signin',
  async (credentials: LoginCredentials, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      const response = await axiosInstance.post(ENDPOINTS.auth.signin, credentials);
      const { id, accessToken, refreshToken } = response.data;

      await AsyncStorage.setItem('accessToken', accessToken);
      await AsyncStorage.setItem('refreshToken', refreshToken);

      dispatch(setTokens({ id, accessToken, refreshToken }));
      dispatch(setLoading(false));
    } catch (e: any) {
      console.log(e);
      dispatch(setError({ message: 'Authentication failed' }));
      dispatch(setLoading(false));
    }
  }
);

export const signOutThunk = createAsyncThunk('auth/signout', async (_, { dispatch }) => {
  try {
    dispatch(setLoading(true));
    const response = await axiosInstance.post(ENDPOINTS.auth.signout);
    if (response.status === 200) {
      await AsyncStorage.removeItem('accessToken');
      await AsyncStorage.removeItem('refreshToken');
      dispatch(logout());
      dispatch(setLoading(false));
    }
  } catch (error) {
    console.log(error);
    dispatch(setError({ message: 'Sign out failed' }));
    dispatch(setLoading(false));
  }
});

export const refreshTokensThunk = createAsyncThunk(
  'auth/refresh',
  async (_, { dispatch, getState }) => {
    try {
      dispatch(setLoading(true));

      const { id, refreshToken } = (getState() as RootState).auth as AuthState;

      const response = await axiosInstance.post(`/auth/${id}/refresh`, { refreshToken });

      const { accessToken, newRefreshToken } = response.data;

      await AsyncStorage.setItem('accessToken', accessToken);
      await AsyncStorage.setItem('refreshToken', newRefreshToken);

      dispatch(setTokens({ id, accessToken, refreshToken: newRefreshToken }));
      dispatch(setLoading(false));
    } catch (error) {
      console.log(error);
      dispatch(logout());
    }
  }
);

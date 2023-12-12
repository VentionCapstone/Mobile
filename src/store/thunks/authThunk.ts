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
      dispatch(setLoading('pending'));
      const response = await axiosInstance.post(ENDPOINTS.auth.signup, credentials);
      if (response.status === 201) {
        dispatch(setLoading('succeeded'));
      }
    } catch (error) {
      console.log(error);
      dispatch(setError('Sign up failed'));
      dispatch(setLoading('failed'));
    } finally {
      dispatch(setLoading('idle'));
    }
  }
);

export const signInThunk = createAsyncThunk(
  'auth/signin',
  async (credentials: LoginCredentials, { dispatch }) => {
    try {
      dispatch(setLoading('pending'));
      const response = await axiosInstance.post(ENDPOINTS.auth.signin, credentials);
      const { userId, accessToken, refreshToken } = response.data;

      await AsyncStorage.setItem('accessToken', accessToken);
      await AsyncStorage.setItem('refreshToken', refreshToken);

      dispatch(setTokens({ userId, accessToken, refreshToken }));
      dispatch(setLoading('succeeded'));
    } catch (error) {
      console.log(error);
      dispatch(setError('Authentication failed'));
      dispatch(setLoading('failed'));
    } finally {
      dispatch(setLoading('idle'));
    }
  }
);

export const signOutThunk = createAsyncThunk('auth/signout', async (_, { dispatch }) => {
  try {
    dispatch(setLoading('pending'));
    const response = await axiosInstance.post(ENDPOINTS.auth.signout);
    if (response.status === 200) {
      await AsyncStorage.removeItem('accessToken');
      await AsyncStorage.removeItem('refreshToken');
      dispatch(logout());
      dispatch(setLoading('succeeded'));
    }
  } catch (error) {
    console.log(error);
    dispatch(setError('Sign out failed'));
    dispatch(setLoading('failed'));
  } finally {
    dispatch(setLoading('idle'));
  }
});

export const refreshTokensThunk = createAsyncThunk(
  'auth/refresh',
  async (_, { dispatch, getState }) => {
    try {
      dispatch(setLoading('pending'));

      const { userId, refreshToken } = (getState() as RootState).auth as AuthState;

      const response = await axiosInstance.post(`/auth/${userId}/refresh`, { refreshToken });

      const { accessToken, newRefreshToken } = response.data;

      await AsyncStorage.setItem('accessToken', accessToken);
      await AsyncStorage.setItem('refreshToken', newRefreshToken);

      dispatch(setTokens({ userId, accessToken, refreshToken: newRefreshToken }));
      dispatch(setLoading('succeeded'));
    } catch (error) {
      console.log(error);
      dispatch(logout());
    } finally {
      dispatch(setLoading('idle'));
    }
  }
);

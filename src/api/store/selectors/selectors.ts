import { RootState } from '../store';

export const getUser = (state: RootState) => state.user.result;
export const getUserLoading = (state: RootState) => state.user.pending;
export const getUserError = (state: RootState) => state.user.error;
export const getIsProfileCreated = (state: RootState) => state.user.isProfileCreated;
